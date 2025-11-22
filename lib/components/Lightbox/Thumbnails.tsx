import cn from 'classnames';

import { LightboxImage } from './Lightbox';
import { Thumbnail } from './Thumbnail';
import styles from './styles.module.scss';

export type ThumbnailsProps = Omit<React.HTMLAttributes<HTMLOListElement>, 'onSelect'> & {
  selected: number;
  images: LightboxImage[];
  onSelect: (index: number) => void;
  renderImage?: (image: LightboxImage) => React.ReactElement;
};

export const Thumbnails = ({
  selected,
  images,
  className,
  onSelect,
  renderImage,
  ...props
}: ThumbnailsProps) => {
  const count = images.length;

  if (count <= 1) {
    return null;
  }

  return (
    <ol {...props} data-lightbox-thumbnails className={cn(styles.thumbnails, className)}>
      {images.map((image, index) => (
        <Thumbnail
          key={index}
          index={index}
          image={image}
          renderImage={renderImage}
          selected={index === selected}
          onSelect={onSelect}
        />
      ))}
    </ol>
  );
};
