import { LightboxImage } from './Lightbox';

export function htmlImage(props: LightboxImage) {
  return <img decoding="async" {...props} />;
}
