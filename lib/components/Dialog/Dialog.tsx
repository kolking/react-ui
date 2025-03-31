import React from 'react';
import cn from 'classnames';

import { Icon } from '../Icon';
import { Button, ButtonProps } from '../Button';
import { DialogFocusTrap } from './DialogFocusTrap';
import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type DialogProps = React.HTMLProps<HTMLDialogElement> & {
  width?: React.CSSProperties['width'];
};

export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  ({ open = false, width, style, className, children, ...props }, ref) => (
    <DialogFocusTrap active={open}>
      <dialog
        {...props}
        ref={ref}
        data-floating-root
        data-dialog={open ? 'open' : 'closed'}
        className={cn(styles.dialog, className)}
        style={{ ...style, ...cssProps({ width }) }}
      >
        {children}
      </dialog>
    </DialogFocusTrap>
  ),
);

export const DialogTitle = ({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) => (
  <h4 {...props} data-dialog-title className={cn(styles.title, className)}>
    {children}
  </h4>
);

export const DialogContent = ({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) => (
  <div {...props} data-dialog-content className={cn(styles.content, className)}>
    {children}
  </div>
);

export const DialogFooter = ({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) => (
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
