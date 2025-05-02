import React from 'react';
import cn from 'classnames';

import { Icon } from '../Icon';
import { Button, ButtonProps } from '../Button';
import { Heading, HeadingProps } from '../Heading';
import { DialogFocusTrap } from './DialogFocusTrap';
import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type DialogProps = React.DialogHTMLAttributes<HTMLDialogElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: React.CSSProperties['width'];
};

export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  ({ open = false, size, width, style, className, children, ...props }, ref) => (
    <DialogFocusTrap active={open}>
      <dialog
        {...props}
        ref={ref}
        data-floating-root
        data-dialog={open ? 'open' : 'closed'}
        className={cn(styles.dialog, className)}
        style={{ ...style, ...cssProps({ size, width }) }}
      >
        <div data-dialog-wrapper className={styles.wrapper}>
          {children}
        </div>
      </dialog>
    </DialogFocusTrap>
  ),
);

export const DialogTitle = ({ className, children, ...props }: Omit<HeadingProps, 'title'>) => (
  <Heading as="h4" {...props} data-dialog-title title={children} className={className} />
);

export const DialogContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} data-dialog-content className={className}>
    {children}
  </div>
);

export const DialogFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} data-dialog-footer className={cn(styles.footer, className)}>
    {children}
  </div>
);

export const DialogClose = ({ className, ...props }: ButtonProps) => (
  <Button
    {...props}
    type="button"
    variant="tertiary"
    data-dialog-close
    aria-label="dismiss dialog"
    icon={<Icon name="close" />}
    className={cn(styles.close, className)}
  />
);
