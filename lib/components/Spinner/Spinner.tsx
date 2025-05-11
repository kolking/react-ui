import React from 'react';
import cn from 'classnames';

import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: string | number;
  color?: string;
  overlay?: boolean;
  overlayColor?: string;
};

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size, color, overlay, overlayColor, className, style, ...props }, ref) => (
    <span
      aria-label="loading"
      {...props}
      ref={ref}
      role="status"
      data-spinner
      data-overlay={overlay}
      className={cn(styles.container, className)}
      style={{ ...style, ...cssProps({ size, color, overlayColor }) }}
    >
      <svg aria-hidden viewBox="0 0 100 100" className={styles.spinner}>
        <circle fill="none" className={styles.track} />
        <circle fill="none" className={styles.range} />
      </svg>
    </span>
  ),
);
