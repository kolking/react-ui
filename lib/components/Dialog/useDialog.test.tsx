import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';

import { DialogOptions, useDialog } from './useDialog';
import { afterTransition } from '../../utils/helpers';

vi.mock('../../utils/helpers', async () => {
  const actual = await vi.importActual('../../utils/helpers');
  return {
    ...actual,
    afterTransition: vi.fn((_el: HTMLElement | null, cb: () => void) => cb()),
  };
});

type Data = { name: string };

const TestComponent = ({
  defaultOpen,
  onShow,
  onConfirm,
  onCancel,
}: DialogOptions<Data, string>) => {
  const {
    props: { ref, open },
    data,
    show,
    confirm,
    cancel,
  } = useDialog<Data, string>({ defaultOpen, onShow, onConfirm, onCancel });

  return (
    <div>
      <button onClick={() => show({ name: 'Alice' })}>show</button>
      <button onClick={() => confirm('ok')}>confirm</button>
      <button onClick={cancel}>cancel</button>

      {/* expose ref to observe attribute changes */}
      <div ref={ref} data-testid="dialog" />

      {/* render state */}
      {open && <div data-testid="open">open</div>}
      {data && <div data-testid="content">{data.name}</div>}
    </div>
  );
};

describe('useDialog', () => {
  it.each(['show', 'confirm', 'cancel'] as const)(
    'uses the latest callback when %s runs in a layout effect after props change',
    (action) => {
      const previous = { onShow: vi.fn(), onConfirm: vi.fn(), onCancel: vi.fn() };
      const current = { onShow: vi.fn(), onConfirm: vi.fn(), onCancel: vi.fn() };

      const Probe = ({
        options,
        action,
      }: {
        options: DialogOptions<number, string>;
        action?: 'show' | 'confirm' | 'cancel';
      }) => {
        const { show, confirm, cancel } = useDialog<number, string>(options);

        React.useLayoutEffect(() => {
          if (action === 'show') show(1);
          if (action === 'confirm') confirm('ok');
          if (action === 'cancel') cancel();
        }, [action, show, confirm, cancel]);

        return null;
      };

      const { rerender } = render(<Probe options={previous} />);
      rerender(<Probe options={current} action={action} />);

      const callback =
        action === 'show' ? 'onShow' : action === 'confirm' ? 'onConfirm' : 'onCancel';
      expect(current[callback]).toHaveBeenCalledTimes(1);
      expect(previous[callback]).not.toHaveBeenCalled();
    },
  );

  it('show sets open/data and calls onShow', () => {
    const onShow = vi.fn();
    render(<TestComponent onShow={onShow} />);

    fireEvent.click(screen.getByRole('button', { name: 'show' }));

    expect(onShow).toHaveBeenCalledWith({ name: 'Alice' });
    expect(screen.getByTestId('open')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toHaveTextContent('Alice');
  });

  it('calls onConfirm and hides dialog', async () => {
    const onConfirm = vi.fn();
    render(<TestComponent onConfirm={onConfirm} />);

    // click show to open, then click confirm
    fireEvent.click(screen.getByRole('button', { name: 'show' }));
    fireEvent.click(screen.getByRole('button', { name: 'confirm' }));

    await waitFor(() => {
      // onConfirm called and content cleared
      expect(onConfirm).toHaveBeenCalledWith('ok');
      expect(screen.queryByTestId('open')).toBeNull();
      expect(screen.queryByTestId('content')).toBeNull();
    });

    const dialog = screen.getByTestId('dialog');
    expect(dialog.getAttribute('data-open')).toBe('false');
  });

  it.each(['confirm', 'cancel'] as const)(
    'uses the callback captured when a %s transition starts',
    (action) => {
      const previous = { onConfirm: vi.fn(), onCancel: vi.fn() };
      const current = { onConfirm: vi.fn(), onCancel: vi.fn() };
      let finishTransition = () => {};
      vi.mocked(afterTransition).mockImplementationOnce((_element, callback) => {
        finishTransition = callback;
      });

      const { rerender } = render(<TestComponent {...previous} />);
      fireEvent.click(screen.getByRole('button', { name: 'show' }));
      fireEvent.click(screen.getByRole('button', { name: action }));

      rerender(<TestComponent {...current} />);
      act(() => finishTransition());

      const callback = action === 'confirm' ? 'onConfirm' : 'onCancel';
      expect(previous[callback]).toHaveBeenCalledTimes(1);
      expect(current[callback]).not.toHaveBeenCalled();
    },
  );

  it('calls onCancel and hides dialog', async () => {
    const onCancel = vi.fn();
    render(<TestComponent onCancel={onCancel} />);

    // click show to open, then click cancel
    fireEvent.click(screen.getByRole('button', { name: 'show' }));
    fireEvent.click(screen.getByRole('button', { name: 'cancel' }));

    await waitFor(() => {
      // onCancel called and content cleared
      expect(onCancel).toHaveBeenCalled();
      expect(screen.queryByTestId('open')).toBeNull();
      expect(screen.queryByTestId('content')).toBeNull();
    });

    const dialog = screen.getByTestId('dialog');
    expect(dialog.getAttribute('data-open')).toBe('false');
  });

  it('preventClose prevents closing while promise is pending', async () => {
    const Controlled = ({ onShow, onConfirm }: DialogOptions<Data, string>) => {
      const {
        props: { open },
        show,
        cancel,
        confirm,
        preventClose,
      } = useDialog<Data, string>({ onShow, onConfirm });
      const [deferred] = React.useState(() => {
        let resolve = () => {};
        const promise = new Promise<void>((res) => {
          resolve = res;
        });

        return { promise, resolve };
      });
      const [finished, setFinished] = React.useState(false);

      const handleConfirm = async () => {
        await preventClose(deferred.promise);

        setFinished(true);
        confirm('ok');
      };

      return (
        <div>
          <button onClick={() => show({ name: 'Bob' })}>show</button>
          <button onClick={cancel}>cancel</button>
          <button onClick={handleConfirm}>confirm</button>
          <button onClick={deferred.resolve}>resolve</button>

          {finished && <div data-testid="done">done</div>}
          {open && <div data-testid="open">open</div>}
        </div>
      );
    };

    const onShow = vi.fn();
    const onConfirm = vi.fn();
    render(<Controlled onShow={onShow} onConfirm={onConfirm} />);

    fireEvent.click(screen.getByRole('button', { name: 'show' }));

    expect(onShow).toHaveBeenCalledWith({ name: 'Bob' });
    expect(screen.getByTestId('open')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'confirm' }));

    // should not call onConfirm until resolved
    expect(onConfirm).not.toHaveBeenCalled();

    // lines 25,35 coverage: should ignore show / close methods
    fireEvent.click(screen.getByRole('button', { name: 'show' }));
    fireEvent.click(screen.getByRole('button', { name: 'cancel' }));

    // resolve the preventing promise and wait for the completion
    fireEvent.click(screen.getByRole('button', { name: 'resolve' }));
    await screen.findByTestId('done');

    // now onConfirm should be called and dialog should close
    expect(onConfirm).toHaveBeenCalledWith('ok');
    expect(screen.queryByTestId('open')).toBeNull();
  });
});
