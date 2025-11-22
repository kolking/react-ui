import { useCallback, useEffect, useRef } from 'react';

import { htmlImage } from './helpers';
import { LightboxImage } from './Lightbox';
import { ThumbnailsProps } from './Thumbnails';

export type ThumbnailProps = {
  index: number;
  selected: boolean;
  image: LightboxImage;
  onSelect: ThumbnailsProps['onSelect'];
  renderImage?: ThumbnailsProps['renderImage'];
};

export const Thumbnail = ({
  index,
  selected,
  image,
  onSelect,
  renderImage = htmlImage,
}: ThumbnailProps) => {
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
    <li ref={ref} data-lightbox-thumbnail={index} data-selected={selected} onClick={handleClick}>
      {renderImage({ ...image, alt: image.alt ?? `Thumbnail ${index + 1}` })}
    </li>
  );
};
