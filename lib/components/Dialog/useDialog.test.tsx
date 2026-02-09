import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { DialogOptions, useDialog } from './useDialog';

vi.mock('../../utils/helpers', async () => {
  const actual = await vi.importActual('../../utils/helpers');
  return {
    ...actual,
    afterTransition: (_el: HTMLElement | null, cb: () => void) => cb(),
  };
});

type Data = { name: string };

const TestComponent = ({
  defaultOpen,
  onShow,
  onConfirm,
  onCancel,
}: DialogOptions<Data, string>) => {
  const dialog = useDialog<Data, string>({ defaultOpen, onShow, onConfirm, onCancel });

  return (
    <div>
      <button onClick={() => dialog.show({ name: 'Alice' })}>show</button>
      <button onClick={() => dialog.confirm('ok')}>confirm</button>
      <button onClick={() => dialog.cancel()}>cancel</button>

      {/* expose ref to observe attribute changes */}
      <div ref={dialog.props.ref} data-testid="dialog" />

      {/* render state */}
      {dialog.props.open && <div data-testid="open">open</div>}
      {dialog.data && <div data-testid="content">{dialog.data.name}</div>}
    </div>
  );
};

describe('useDialog', () => {
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
      const dialog = useDialog<Data, string>({ onShow, onConfirm });
      const resolverRef = React.useRef<() => void>(() => {});
      const promise = new Promise<void>((res) => (resolverRef.current = res));
      const [finished, setFinished] = React.useState(false);

      const handleConfirm = async () => {
        await dialog.preventClose(promise);

        setFinished(true);
        dialog.confirm('ok');
      };

      return (
        <div>
          <button onClick={() => dialog.show({ name: 'Bob' })}>show</button>
          <button onClick={() => dialog.cancel()}>cancel</button>
          <button onClick={handleConfirm}>confirm</button>
          <button onClick={() => resolverRef.current()}>resolve</button>

          {finished && <div data-testid="done">done</div>}
          {dialog.props.open && <div data-testid="open">open</div>}
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
