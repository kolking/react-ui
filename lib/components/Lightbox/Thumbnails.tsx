import React from 'react';
import cn from 'classnames';

import { Thumbnail } from './Thumbnail';
import { LightboxImage } from './Lightbox';
import { cssProps, htmlImage } from '../../utils/helpers';
import styles from './styles.module.scss';

export type ThumbnailsProps<T extends LightboxImage> = Omit<
  React.HTMLAttributes<HTMLUListElement>,
  'onSelect'
> & {
  images: T[];
  selected: number;
  imageSize?: React.CSSProperties['width'];
  objectFit?: React.CSSProperties['objectFit'];
  renderImage?: (image: T) => React.ReactElement;
  onSelect: (index: number) => void;
};

export const Thumbnails = <T extends LightboxImage>({
  images,
  selected,
  className,
  style,
  imageSize: thumbnailSize,
  objectFit: thumbnailObjectFit,
  renderImage = htmlImage,
  onSelect,
  ...props
}: ThumbnailsProps<T>) => {
  const count = images.length;

  if (count <= 1) {
    return null;
  }

  return (
    <ul
      {...props}
      role="listbox"
      data-lightbox-thumbnails
      className={cn(styles.thumbnails, className)}
      style={{ ...style, ...cssProps({ thumbnailSize, thumbnailObjectFit }) }}
    >
      {images.map((image, index) => (
        <Thumbnail key={index} index={index} selected={index === selected} onSelect={onSelect}>
          {renderImage({ ...image, alt: image.alt ?? `Thumbnail ${index + 1}` })}
        </Thumbnail>
      ))}
    </ul>
  );
};
