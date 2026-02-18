import React from 'react';

import { Dialog, DialogProps } from './Dialog';
import { DialogOptions, DialogShowOptions, DialogType, useDialog } from './useDialog';

type PartialDialogProps = Omit<DialogProps, 'children' | 'ref' | 'requestClose'>;

type ComponentProps<T, R> = PartialDialogProps &
  DialogOptions<T, R> & {
    children: React.ReactNode | ((dialog: DialogType<T, R>) => React.ReactNode);
  };

export type WithDialogProps<T extends object, R> = T & {
  dialog: DialogType<T, R>;
};

export function withDialog<T extends object, R>(
  Component: React.ComponentType<WithDialogProps<T, R>>,
  withProps?: PartialDialogProps,
) {
  const Context = React.createContext((_values: T, _showOptions?: DialogShowOptions<R>): void => {
    throw new Error('Dialog context is not available');
  });

  function Wrapper({
    children,
    defaultOpen,
    onShow,
    onConfirm,
    onCancel,
    ...props
  }: ComponentProps<T, R>) {
    const dialog = useDialog<T, R>({ defaultOpen, onShow, onConfirm, onCancel });
    const dialogProps = { ...withProps, ...props, ...dialog.props };

    return (
      <>
        <Context value={dialog.show}>
          {typeof children === 'function' ? children(dialog) : children}
        </Context>
        <Dialog {...dialogProps}>
          {dialog.data && <Component {...dialog.data} dialog={dialog} />}
        </Dialog>
      </>
    );
  }

  Wrapper.useDialogShow = () => {
    return React.useContext(Context);
  };

  return Wrapper;
}
