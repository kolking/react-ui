import React from 'react';

import { Dialog, DialogProps } from './Dialog';
import { DialogOptions, DialogType, useDialog } from './useDialog';

type PartialDialogProps = Omit<DialogProps, 'children' | 'ref' | 'requestClose'>;

type ComponentProps<T, R> = PartialDialogProps &
  DialogOptions<T, R> & {
    children: (dialog: DialogType<T, R>) => React.ReactNode;
  };

export type WithDialogProps<T extends object, R> = T & {
  dialog: DialogType<T, R>;
};

export function withDialog<T extends object, R>(
  Component: React.ComponentType<WithDialogProps<T, R>>,
  withProps?: PartialDialogProps,
): React.ComponentType<ComponentProps<T, R>> {
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
        {children(dialog)}
        <Dialog {...dialogProps}>
          {dialog.data && <Component {...dialog.data} dialog={dialog} />}
        </Dialog>
      </>
    );
  }

  return Wrapper;
}
