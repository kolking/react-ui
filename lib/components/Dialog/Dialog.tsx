import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from 'focus-trap-react';
import cn from 'classnames';

import { cssProps } from '../../utils/helpers';
import { Button, ButtonProps } from '../Button';
import { Heading, HeadingProps } from '../Heading';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

const focusTrapOptions = { escapeDeactivates: false };

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: React.CSSProperties['width'];
  requestClose: () => void;
};

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open = false, size, width, style, className, children, requestClose, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    useEffect(() => {
      const dialog = innerRef.current;

      if (dialog && open) {
        // Hide when clicked outside
        function handleClick(e: MouseEvent) {
          if (e.target === e.currentTarget) {
            requestClose();
          }
        }

        // Hide when escape pressed
        function handleEscape(e: KeyboardEvent) {
          if (e.key === 'Escape') {
            e.stopPropagation();
            e.preventDefault();
            requestClose();
          }
        }

        dialog.addEventListener('click', handleClick);
        dialog.addEventListener('keydown', handleEscape);

        return () => {
          dialog.removeEventListener('click', handleClick);
          dialog.removeEventListener('keydown', handleEscape);
        };
      }
    }, [open, requestClose]);

    if (!open) {
      return null;
    }

    return createPortal(
      <FocusTrap active={open} focusTrapOptions={focusTrapOptions}>
        <div
          {...props}
          ref={innerRef}
          tabIndex={0}
          data-dialog
          data-open={open}
          data-floating-root
          className={styles.overlay}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            data-dialog-wrapper
            className={cn(styles.dialog, className)}
            style={{ ...style, ...cssProps({ size, width }) }}
          >
            {children}
          </div>
        </div>
      </FocusTrap>,
      // Append to an element with data-floating-root attribute
      document.querySelector('[data-floating-root]') ?? document.body,
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
