import cn from 'classnames';
import { Composite, CompositeItem } from '@floating-ui/react';

import styles from './styles.module.scss';
import { cssProps } from '../../utils/helpers';

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
  className,
  style,
  onSelect,
  ...props
}: SegmentedProps) => (
  <Composite
    {...props}
    role="radiogroup"
    data-segmented={selected}
    className={cn(styles.segmented, className)}
    style={{
      ...style,
      ...cssProps({
        size,
        margin,
        length: items.length.toString(),
        selected: selected.toString(),
      }),
    }}
  >
    {items.map((item, index) => (
      <CompositeItem
        key={index}
        render={
          <button
            role="radio"
            type="button"
            disabled={disabled}
            aria-checked={index === selected}
            data-selected={index === selected}
            onClick={() => index !== selected && onSelect(index)}
          >
            {item}
          </button>
        }
      />
    ))}
  </Composite>
);
