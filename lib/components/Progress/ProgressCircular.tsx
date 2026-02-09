import React from 'react';
import cn from 'classnames';

import { clamp, cssProps } from '../../utils/helpers';
import styles from './styles-circular.module.scss';

function getCssValue(min: number, max: number, progress?: number) {
  if (progress !== undefined) {
    return (((progress - min) / (max - min)) * 100).toString();
  }

  return progress;
}

export type ProgressCircularProps = React.HTMLAttributes<HTMLDivElement> & {
  min?: number;
  max?: number;
  value: number | null;
  size?: string | number;
  countdown?: boolean;
  thickness?: number;
  linecap?: 'round';
  color?: string;
  trackColor?: string;
  margin?: React.CSSProperties['margin'];
};

export const ProgressCircular = React.forwardRef<HTMLDivElement, ProgressCircularProps>(
  (
    {
      min = 0,
      max = 100,
      value,
      size,
      countdown,
      thickness,
      linecap,
      color,
      trackColor,
      margin,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const progress = value !== null ? clamp(value, min, max) : undefined;
    const label = progress !== undefined ? `${progress} percent` : 'indeterminate';

    return (
      <div
        aria-label={label}
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={progress}
        data-progress-circular
        data-countdown={countdown}
        data-progress-value={progress ?? 'indeterminate'}
        className={cn(styles.container, className)}
        style={{
          ...style,
          ...cssProps({
            size,
            thickness,
            linecap,
            color,
            trackColor,
            margin,
            value: getCssValue(min, max, progress),
          }),
        }}
      >
        <svg aria-hidden className={styles.progress}>
          <circle fill="none" className={styles.track} />
          <circle fill="none" className={styles.range} />
        </svg>
        {children && <div className={styles.inner}>{children}</div>}
      </div>
    );
  },
);
