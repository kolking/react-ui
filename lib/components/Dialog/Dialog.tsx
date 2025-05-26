import React from 'react';
import cn from 'classnames';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';

import { cssProps } from '../../utils/helpers';
import { Button, ButtonProps } from '../Button';
import { Heading, HeadingProps } from '../Heading';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: React.CSSProperties['width'];
  requestClose: () => void;
};

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open = false, size, width, style, className, children, requestClose, ...props }, ref) => {
    const { refs, context } = useFloating({
      open,
      onOpenChange: requestClose,
    });

    const { getFloatingProps } = useInteractions([
      useDismiss(context),
      useRole(context, { role: 'dialog' }),
    ]);

    const dialogRef = useMergeRefs([refs.setFloating, ref]);
    const portalRef = document.querySelector<HTMLElement>('[data-floating-root]') ?? document.body;

    if (!open) {
      return null;
    }

    return (
      <FloatingPortal root={portalRef}>
        <FloatingOverlay
          lockScroll
          data-floating-root
          data-dialog-overlay
          className={styles.overlay}
        >
          <FloatingFocusManager context={context}>
            <div
              {...getFloatingProps(props)}
              ref={dialogRef}
              data-dialog
              data-open={open}
              className={cn(styles.dialog, className)}
              style={{ ...style, ...cssProps({ size, width }) }}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);

export const DialogTitle = ({ className, children, ...props }: Omit<HeadingProps, 'title'>) => (
  <Heading
    as="h4"
    {...props}
    data-dialog-title
    title={children}
    className={cn(styles.title, className)}
  />
);

export const DialogContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} data-dialog-content />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} data-dialog-footer className={cn(styles.footer, className)} />
);

export const DialogClose = ({ className, ...props }: ButtonProps) => (
  <Button
    type="button"
    variant="tertiary"
    aria-label="close dialog"
    icon={<Icon name="close" />}
    {...props}
    data-dialog-close
    className={cn(styles.close, className)}
  />
);
