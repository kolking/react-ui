import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Composite, CompositeItem } from '@floating-ui/react';

import { cssProps, wrapNode } from '../../utils/helpers';
import styles from './styles.module.scss';

export type SegmentedItem<T> = {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
};

export type SegmentedProps<T> = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  items: SegmentedItem<T>[];
  selected?: T;
  disabled?: boolean;
  margin?: React.CSSProperties['margin'];
  onSelect?: (value: T) => void;
};

export const Segmented = <T,>({
  size,
  items,
  selected = items[0].value,
  disabled,
  margin,
  children,
  className,
  style,
  onSelect,
  ...props
}: SegmentedProps<T>) => {
  const [selectedValue, setSelectedValue] = useState(selected);

  useEffect(() => {
    setSelectedValue(selected);
  }, [selected]);

  return (
    <Composite
      {...props}
      role="radiogroup"
      orientation="horizontal"
      data-segmented
      data-disabled={disabled}
      className={cn(styles.segmented, className)}
      style={{ ...style, ...cssProps({ size, margin }) }}
    >
      {items.map((item, index) => (
        <CompositeItem
          key={index}
          render={
            <button
              role="radio"
              type="button"
              disabled={disabled || item.disabled}
              data-segmented-item={index}
              aria-checked={item.value === selectedValue}
              data-selected={item.value === selectedValue}
              className={styles.button}
              onClick={() => {
                setSelectedValue(item.value);
                onSelect?.(item.value);
              }}
            >
              {wrapNode(item.label, 'span')}
            </button>
          }
        />
      ))}
      {children}
    </Composite>
  );
};
