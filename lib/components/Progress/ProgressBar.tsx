import React from 'react';
import cn from 'classnames';

import { clamp, cssProps } from '../../utils/helpers';
import styles from './styles-bar.module.scss';

export type ProgressBarProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number | null;
  width?: string | number;
  height?: string | number;
  color?: string;
  trackColor?: string;
  margin?: React.CSSProperties['margin'];
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      width,
      height,
      color,
      trackColor,
      minWidth,
      maxWidth,
      margin,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const progress = value ? clamp(value, 0, 100) : undefined;

    return (
      <div
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={progress ? `${progress} percent` : 'indeterminate'}
        data-progress="bar"
        data-progress-value={progress ?? 'indeterminate'}
        className={cn(styles.progress, className)}
        style={{
          ...style,
          ...cssProps({ width, height, color, trackColor, minWidth, maxWidth, margin }),
        }}
      >
        <span className={styles.bar} style={{ width: `${progress}%` }} />
      </div>
    );
  },
);
