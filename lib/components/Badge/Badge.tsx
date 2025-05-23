import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

import { cssProps } from '../../utils/helpers';
import { PaletteColor } from '../../utils/colors';
import styles from './styles.module.scss';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  scheme?: PaletteColor;
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null;
  value?: number | string | boolean;
  maxValue?: number;
};

export const Badge = ({
  size,
  scheme = 'red',
  placement = 'top-right',
  value,
  maxValue = 99,
  className,
  style,
  ...props
}: BadgeProps) => {
  const hidden = !value;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hidden && placement && ref.current) {
      const height = ref.current.clientHeight;
      const parent = ref.current.parentElement;
      const parentRadius = parent
        ? Math.min(
            parseInt(getComputedStyle(parent).getPropertyValue('border-radius')),
            parent.clientHeight / 2,
          )
        : 0;

      // To precisely place the badge at the parent's edge we need to find the distance
      // between the containing area corner and the point with polar coordinates (r,45°)
      // which can be calculated as x = r - r × sin(45°), where r is the border radius.
      // Self offset is how much to shift the badge from the edge point, its value ranges
      // from height / 4 (for square) to height / 2 (for circle)
      const edgeOffset = parentRadius * (1 - Math.sin((45 * Math.PI) / 180));
      const selfOffset = (1 + Math.min(parentRadius / height, 1)) * (height / 4);

      ref.current.style.setProperty('--offset', `${edgeOffset - selfOffset}px`);
    }
  }, [hidden, placement]);

  if (hidden) {
    return null;
  }

  const showMaxValue = typeof value === 'number' && maxValue > 0 && value > maxValue;

  return (
    <span
      {...props}
      ref={ref}
      data-badge={scheme}
      data-placement={placement}
      className={cn(styles.badge, styles[scheme], className)}
      style={{ ...style, ...cssProps({ size }) }}
    >
      {showMaxValue ? `${maxValue}+` : value}
    </span>
  );
};
