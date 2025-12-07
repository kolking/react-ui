import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Composite, CompositeProps } from '@floating-ui/react';

import { cssProps } from '../../utils/helpers';
import styles from './styles.module.scss';

export type GalleryProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<CompositeProps, 'cols'> & {
    cols?: number | 'auto';
    gap?: React.CSSProperties['gap'];
    itemSize?: React.CSSProperties['width'];
    objectFit?: React.CSSProperties['objectFit'];
    marginStart?: React.CSSProperties['marginBlockStart'];
    marginEnd?: React.CSSProperties['marginBlockEnd'];
  };

export const Gallery = ({
  gap,
  loop = false,
  cols = 'auto',
  itemSize,
  objectFit: imageObjectFit,
  marginStart,
  marginEnd,
  className,
  style,
  children,
  ...props
}: GalleryProps) => {
  const ref = useRef<HTMLElement>(null);
  const [columns, setColumns] = useState(cols === 'auto' ? 1 : cols);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const cssColumns = window.getComputedStyle(entries[0].target).gridTemplateColumns;
      setColumns(cssColumns.split(' ').length);
    });

    if (ref.current) {
      if (cols === 'auto') {
        observer.observe(ref.current);
      } else {
        observer.unobserve(ref.current);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [cols]);

  return (
    <Composite
      {...props}
      ref={ref}
      loop={loop}
      cols={columns}
      data-gallery
      className={cn(styles.gallery, className)}
      style={{
        ...style,
        ...cssProps({ gap, marginStart, marginEnd, itemSize, imageObjectFit }),
      }}
    >
      {children}
    </Composite>
  );
};
