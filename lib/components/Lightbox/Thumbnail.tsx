import { useCallback, useEffect, useRef } from 'react';

export type ThumbnailProps = {
  index: number;
  selected: boolean;
  children: React.ReactNode;
  onSelect: (index: number) => void;
};

export const Thumbnail = ({ index, selected, children, onSelect }: ThumbnailProps) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ inline: 'center' });
    }
  }, [selected]);

  const handleClick = useCallback(() => {
    onSelect(index);
  }, [index, onSelect]);

  return (
    <li
      ref={ref}
      role="option"
      aria-selected={selected}
      data-selected={selected}
      data-lightbox-thumbnail={index}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};
