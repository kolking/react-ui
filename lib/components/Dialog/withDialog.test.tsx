import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { DialogType } from './useDialog';
import { withDialog, WithDialogProps } from './withDialog';

vi.mock('../../utils/helpers', async () => {
  const actual = await vi.importActual('../../utils/helpers');
  return {
    ...actual,
    afterTransition: (_el: HTMLElement | null, cb: () => void) => cb(),
  };
});

describe('withDialog HOC', () => {
  it('shows component with data and calls onShow and onConfirm', async () => {
    const onShow = vi.fn();
    const onConfirm = vi.fn();

    // Simple component that implements dialog.confirm
    const Content = ({ name, dialog }: WithDialogProps<{ name: string }, string>) => (
      <div>
        <span>{name}</span>
        <button onClick={() => dialog.confirm('result')}>Confirm</button>
      </div>
    );

    const Wrapped = withDialog(Content);

    // capture dialog instance from children
    let capturedDialog: DialogType<{ name: string }, string> | undefined;

    render(
      <Wrapped onShow={onShow} onConfirm={onConfirm}>
        {(dialog) => {
          capturedDialog = dialog;
          return <button onClick={() => dialog.show({ name: 'Alice' })}>Open</button>;
        }}
      </Wrapped>,
    );

    const open = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(open);

    expect(onShow).toHaveBeenCalledWith({ name: 'Alice' });

    const content = await screen.findByText('Alice');
    expect(content).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      // onConfirm should be called with the confirm value
      expect(onConfirm).toHaveBeenCalledWith('result');
      // After confirm, content should be removed
      expect(screen.queryByText('Alice')).toBeNull();
    });

    // ensure capturedDialog exists and its methods are callable
    expect(typeof capturedDialog!.show).toBe('function');
    expect(typeof capturedDialog!.confirm).toBe('function');
  });

  it('calls onCancel when dialog.cancel method is called', async () => {
    const onCancel = vi.fn();

    const Content = ({ dialog }: WithDialogProps<object, string>) => (
      <div>
        <button onClick={dialog.cancel}>Cancel</button>
      </div>
    );

    const Wrapped = withDialog(Content);

    render(
      <Wrapped onCancel={onCancel}>
        {(dialog) => <button onClick={dialog.show}>Open</button>}
      </Wrapped>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));

    const cancelBtn = await screen.findByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled();
    });

    // After cancel, dialog content should be gone
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
  });

  it('returns dialog.show from useDialogShow inside wrapper context', async () => {
    const Content = ({ name }: WithDialogProps<{ name: string }, string>) => <span>{name}</span>;
    const Wrapped = withDialog(Content);

    const Trigger = () => {
      const show = Wrapped.useDialogShow();
      return <button onClick={() => show({ name: 'Alice' })}>Open</button>;
    };

    render(
      <Wrapped>
        <Trigger />
      </Wrapped>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(await screen.findByText('Alice')).toBeInTheDocument();
  });

  it('throws when useDialogShow is called outside wrapper context', () => {
    const Content = ({ name }: WithDialogProps<{ name: string }, string>) => <span>{name}</span>;
    const Wrapped = withDialog(Content);

    const OutsideTrigger = () => {
      const show = Wrapped.useDialogShow();
      show({ name: 'Bob' });
      return null;
    };

    expect(() => render(<OutsideTrigger />)).toThrow('Dialog context is not available');
  });
});
