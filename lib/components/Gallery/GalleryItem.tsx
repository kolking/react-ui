import React, { useCallback } from 'react';
import { CompositeItem, CompositeItemProps } from '@floating-ui/react';
import cn from 'classnames';

import styles from './styles.module.scss';

type BaseProps = React.HTMLAttributes<HTMLDivElement> & CompositeItemProps;

export type GalleryItemProps =
  | (BaseProps & {
      index?: undefined;
      onSelect?: undefined;
    })
  | (Omit<BaseProps, 'onSelect'> & {
      index: number;
      onSelect?: (index: number) => void;
    });

export const GalleryItem = ({
  index,
  children,
  className,
  onClick,
  onSelect,
  onKeyDown,
  ...props
}: GalleryItemProps) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onSelect?.(index);
      onClick?.(e);
    },
    [index, onClick, onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        onSelect?.(index);
      }
      onKeyDown?.(e);
    },
    [index, onKeyDown, onSelect],
  );

  return (
    <CompositeItem
      {...props}
      role="button"
      data-gallery-image={index}
      className={cn(styles.item, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </CompositeItem>
  );
};
