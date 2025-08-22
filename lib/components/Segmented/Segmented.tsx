import cn from 'classnames';
import { useEffect, useState } from 'react';
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
  className,
  style,
  onSelect,
  ...props
}: SegmentedProps) => {
  const [widths, setWidths] = useState<number[]>([]);
  const selectedWidth = widths[selected];
  const selectedOffset = widths.reduce((acc, w, i) => (i < selected ? acc + w : acc), 0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const sizes = [];

      for (const entry of entries) {
        sizes.push(entry.borderBoxSize[0].inlineSize);
      }

      setWidths(sizes);
    });

    for (const item of document.querySelectorAll('[data-segmented-item]')) {
      resizeObserver.observe(item);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Composite
      {...props}
      role="radiogroup"
      data-segmented
      data-disabled={disabled}
      className={cn(styles.segmented, className)}
      style={{
        ...style,
        ...cssProps({
          size,
          margin,
          width: selectedWidth,
          offset: selectedOffset,
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
    </Composite>
  );
};
