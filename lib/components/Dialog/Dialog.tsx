import React, { useContext, useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';

import { cssProps } from '../../utils/helpers';
import { DialogContext } from './DialogContext';
import { Button, ButtonProps } from '../Button';
import { Heading, HeadingProps } from '../Heading';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: React.CSSProperties['width'];
  lockScroll?: boolean;
  requestClose: () => void;
  setTriggerProps?: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open = false,
      size,
      width,
      lockScroll = true,
      style,
      className,
      children,
      setTriggerProps,
      requestClose,
      ...props
    },
    ref,
  ) => {
    const [labelId, setLabelId] = useState<string>();

    const { refs, context } = useFloating({
      open,
      onOpenChange: requestClose,
    });

    const { getFloatingProps, getReferenceProps } = useInteractions([
      useDismiss(context),
      useRole(context, { role: 'dialog' }),
    ]);

    useLayoutEffect(() => {
      setTriggerProps?.(getReferenceProps());
    }, [setTriggerProps, getReferenceProps]);

    const dialogRef = useMergeRefs([refs.setFloating, ref]);
    const portalRef = document.querySelector<HTMLElement>('[data-floating-root]') ?? document.body;

    if (!open) {
      return null;
    }

    return (
      <DialogContext.Provider value={{ labelId, setLabelId, requestClose }}>
        <FloatingPortal root={portalRef}>
          <FloatingOverlay
            data-floating-root
            data-dialog-overlay
            lockScroll={lockScroll}
            className={styles.overlay}
          >
            <FloatingFocusManager context={context}>
              <div
                {...getFloatingProps(props)}
                ref={dialogRef}
                data-dialog
                data-open={open}
                aria-labelledby={labelId}
                className={cn(styles.dialog, className)}
                style={{ ...style, ...cssProps({ size, width }) }}
              >
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      </DialogContext.Provider>
    );
  },
);

export const DialogTitle = ({ className, children, ...props }: Omit<HeadingProps, 'title'>) => {
  const labelId = useId();
  const { setLabelId } = useContext(DialogContext);

  // Set aria-labelledby for the Dialog
  useLayoutEffect(() => {
    setLabelId(labelId);
    return () => setLabelId(undefined);
  }, [labelId, setLabelId]);

  return (
    <Heading
      as="h4"
      {...props}
      id={labelId}
      data-dialog-title
      title={children}
      className={cn(styles.title, className)}
    />
  );
};

export const DialogContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} data-dialog-content />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} data-dialog-footer className={cn(styles.footer, className)} />
);

export const DialogClose = ({ className, ...props }: ButtonProps) => {
  const { requestClose } = useContext(DialogContext);

  return (
    <Button
      type="button"
      variant="tertiary"
      aria-label="close dialog"
      icon={<Icon name="close" />}
      onClick={requestClose}
      {...props}
      data-dialog-close
      className={cn(styles.close, className)}
    />
  );
};
