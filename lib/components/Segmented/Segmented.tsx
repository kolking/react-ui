import cn from 'classnames';
import { Composite, CompositeItem } from '@floating-ui/react';

import styles from './styles.module.scss';
import { cssProps, wrapNode } from '../../utils/helpers';

export type SegmentedProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  items: React.ReactNode[];
  selected: number;
  disabled?: boolean;
  margin?: React.CSSProperties['margin'];
  onSelect: (index: number) => void;
};

export const Segmented = ({
  size,
  items,
  selected,
  disabled,
  margin,
  children,
  className,
  style,
  onSelect,
  ...props
}: SegmentedProps) => (
  <Composite
    {...props}
    role="radiogroup"
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
            disabled={disabled}
            data-segmented-item={index}
            aria-checked={index === selected}
            data-selected={index === selected}
            onClick={() => index !== selected && onSelect(index)}
          >
            {wrapNode(item, 'span')}
          </button>
        }
      />
    ))}
    {children}
  </Composite>
);
