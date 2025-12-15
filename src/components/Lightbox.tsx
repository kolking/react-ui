import { useState } from 'react';
import { Lightbox, Heading, LightboxImage, Gallery, GalleryItem, Icon } from '@lib';

const images: LightboxImage[] = [
  {
    src: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg',
    alt: 'Pink Petaled Flower Plant Inside White Hanging Pot',
    loading: 'lazy',
  },
  {
    src: 'https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg',
    alt: 'Low Angle View of Pink Flowers Against Blue Sky',
  },
  {
    src: 'https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg',
    alt: 'Pink Flowers Photography',
  },
  {
    src: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
    alt: 'Silhouette Of Mountains',
  },
  {
    src: 'https://images.pexels.com/photos/1115090/pexels-photo-1115090.jpeg',
    alt: 'Orange Flower',
  },
  {
    src: 'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
    alt: 'Black Withered Tree Surounded by Body of Water',
  },
  {
    src: 'https://images.pexels.com/photos/1651165/pexels-photo-1651165.jpeg',
    alt: 'Close-Up Photo of Fallen Leaves',
  },
  {
    src: 'https://images.pexels.com/photos/1726310/pexels-photo-1726310.jpeg',
    alt: 'Aerial Photography of Island',
  },
  {
    src: 'https://images.pexels.com/photos/1544376/pexels-photo-1544376.jpeg',
    alt: 'Scenic Photo of an Island',
  },
  {
    src: 'https://images.pexels.com/photos/2253573/pexels-photo-2253573.jpeg',
    alt: 'Sea Waves',
  },
];

function renderImage({ src, ...rest }: LightboxImage) {
  return <img decoding="async" src={`${src}?w=350&h=350`} {...rest} />;
}

export const LightboxDemo = () => {
  const [selected, setSelected] = useState<number>();

  return (
    <>
      <Heading title="Gallery and Lightbox" />
      <Gallery>
        <GalleryItem render={<button />} onClick={() => console.log('button')}>
          <Icon size="3em" name="photos" scheme="neutral" />
        </GalleryItem>
        {images.map((image, index) => (
          <GalleryItem key={index} index={index} onSelect={setSelected}>
            {renderImage(image)}
          </GalleryItem>
        ))}
      </Gallery>
      {selected !== undefined && (
        <Lightbox images={images} selected={selected} onSelect={setSelected}>
          <Lightbox.Thumbnails
            images={images}
            selected={selected}
            renderImage={renderImage}
            onSelect={setSelected}
          />
        </Lightbox>
      )}
    </>
  );
};
