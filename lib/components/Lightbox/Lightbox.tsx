import { useCallback, useEffect, useRef } from 'react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';

import { Icon } from '../Icon';
import { Button } from '../Button';
import { Thumbnails } from './Thumbnails';
import { afterTransition } from '../../utils/helpers';
import styles from './styles.module.scss';

export type LightboxImage = {
  src: string;
  alt?: string;
};

export type LightboxProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  selected: number;
  images: LightboxImage[];
  onSelect: (index?: number) => void;
};

export const Lightbox = ({
  selected,
  images,
  className,
  children,
  onSelect,
  ...props
}: LightboxProps) => {
  const count = images.length;
  const open = selected !== undefined;
  const imagesRef = useRef<(HTMLElement | null)[]>([]);
  const portalRef = document.querySelector<HTMLElement>('[data-floating-root]') ?? document.body;

  const { refs, context, elements } = useFloating({
    open,
    onOpenChange: () => closeLightbox(),
  });

  const listNavigation = useListNavigation(context, {
    loop: true,
    // virtual: true,
    // allowEscape: true,
    listRef: imagesRef,
    activeIndex: selected,
    selectedIndex: selected,
    orientation: 'both',
    focusItemOnHover: false,
    openOnArrowKeyDown: false,
    scrollItemIntoView: { block: 'nearest' },
    onNavigate: (index) => {
      if (index !== null) {
        onSelect(index);
      }
    },
  });

  const { getFloatingProps, getItemProps } = useInteractions([
    listNavigation,
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
  ]);

  const closeLightbox = useCallback(() => {
    elements.floating?.classList.add(styles.willhide);

    afterTransition(elements.floating, () => {
      onSelect(undefined);
    });
  }, [elements.floating, onSelect]);

  const selectPrev = useCallback(() => {
    onSelect(selected === 0 ? count - 1 : selected - 1);
  }, [count, selected, onSelect]);

  const selectNext = useCallback(() => {
    onSelect(selected === count - 1 ? 0 : selected + 1);
  }, [count, selected, onSelect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onSelect(imagesRef.current.indexOf(entry.target as HTMLElement));
          }
        });
      },
      {
        root: elements.floating,
        threshold: 1.0,
      },
    );

    // FloatingPortal's children are not available on the first render
    // https://github.com/floating-ui/floating-ui/issues/2827#issuecomment-2016329901
    if (elements.floating) {
      imagesRef.current.forEach((image) => {
        if (image) {
          observer.observe(image);
        }
      });
    }
  }, [elements.floating, onSelect]);

  return (
    <FloatingPortal root={portalRef}>
      <FloatingOverlay lockScroll={true} />
      <FloatingFocusManager context={context}>
        <div
          {...getFloatingProps(props)}
          ref={refs.setFloating}
          data-lightbox
          data-floating-root
          className={cn(styles.lightbox, className)}
        >
          <div data-lightbox-content className={styles.content}>
            <div data-lightbox-images className={styles.images}>
              {images.map((image, index) => (
                <figure
                  key={index}
                  ref={(node) => {
                    imagesRef.current[index] = node;
                  }}
                  data-lightbox-image={index}
                  data-selected={index === selected}
                  tabIndex={index === selected ? 0 : -1}
                  {...getItemProps()}
                >
                  <img
                    decoding="async"
                    src={image.src}
                    alt={image.alt ?? `Image ${index + 1} of ${count}`}
                  />
                </figure>
              ))}
            </div>
            <Button
              type="button"
              variant="tertiary"
              data-lightbox-close
              aria-label="close lightbox"
              icon={<Icon name="close" />}
              className={styles.close}
              onClick={closeLightbox}
            />
            {count > 1 && (
              <>
                <Button
                  type="button"
                  variant="tertiary"
                  data-lightbox-prev
                  aria-label="previous image"
                  icon={<Icon name="arrow-left" />}
                  className={styles.prev}
                  onClick={selectPrev}
                />
                <Button
                  type="button"
                  variant="tertiary"
                  data-lightbox-next
                  aria-label="next image"
                  icon={<Icon name="arrow-right" />}
                  className={styles.next}
                  onClick={selectNext}
                />
              </>
            )}
          </div>
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};

Lightbox.Thumbnails = Thumbnails;
