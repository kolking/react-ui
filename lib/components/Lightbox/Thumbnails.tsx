import cn from 'classnames';

import { LightboxImage } from './Lightbox';
import styles from './styles.module.scss';

export type ThumbnailsProps = Omit<React.HTMLAttributes<HTMLOListElement>, 'onSelect'> & {
  selected: number;
  images: LightboxImage[];
  onSelect: (index: number) => void;
};

export const Thumbnails = ({
  selected,
  images,
  className,
  onSelect,
  ...props
}: ThumbnailsProps) => {
  const count = images.length;

  if (count <= 1) {
    return null;
  }

  return (
    <ol {...props} data-lightbox-thumbnails className={cn(styles.thumbnails, className)}>
      {images.map((image, index) => (
        <li
          key={index}
          data-lightbox-thumbnail={index}
          data-selected={index === selected}
          onClick={() => onSelect(index)}
        >
          <img decoding="async" src={image.src} alt={`Thumbnail ${index + 1}`} />
        </li>
      ))}
    </ol>
  );
};
