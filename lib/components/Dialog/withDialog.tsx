import React, { useMemo } from 'react';

import { Dialog, DialogProps } from './Dialog';
import { DialogOptions, DialogType, useDialog } from './useDialog';

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
): React.ComponentType<ComponentProps<T, R>> & {
  useTrigger: () => {
    props: Record<string, unknown>;
    show: (props: T, options?: DialogOptions<T, R>) => void;
  };
} {
  const Context = React.createContext({
    props: {} as Record<string, unknown>,
    show(_props: T, _options?: DialogOptions<T, R>): void {
      throw new Error('Dialog context is not availble');
    },
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
    const context = useMemo(() => {
      return {
        props: dialog.triggerProps,
        show: dialog.show,
      };
    }, [dialog.show, dialog.triggerProps]);

    return (
      <>
        <Context value={context}>
          {typeof children === 'function' ? children(dialog) : children}
        </Context>
        <Dialog {...dialogProps}>
          {dialog.data && <Component {...dialog.data} dialog={dialog} />}
        </Dialog>
      </>
    );
  }

  Wrapper.useTrigger = () => {
    return React.useContext(Context);
  };

  return Wrapper;
}
