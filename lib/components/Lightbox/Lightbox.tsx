import { useCallback, useEffect, useId, useRef } from 'react';
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
import { afterTransition, htmlImage } from '../../utils/helpers';
import styles from './styles.module.scss';

export type LightboxImage = React.ImgHTMLAttributes<HTMLImageElement>;

export type LightboxProps<T extends LightboxImage> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onSelect'
> & {
  images: T[];
  selected: number;
  loop?: boolean;
  onSelect: (index?: number) => void;
  renderImage?: (image: T) => React.ReactElement;
};

export const Lightbox = <T extends LightboxImage>({
  images,
  selected,
  loop = true,
  className,
  children,
  onSelect,
  renderImage = htmlImage,
  ...props
}: LightboxProps<T>) => {
  const id = useId();
  const count = images.length;
  const open = selected !== undefined;
  const imagesRef = useRef<Array<HTMLElement | null>>([]);
  const portalRef = document.querySelector<HTMLElement>('[data-floating-root]') ?? document.body;
  const showPrev = count > 1 && (loop || selected > 0);
  const showNext = count > 1 && (loop || selected < count - 1);

  const { refs, context, elements } = useFloating({
    open,
    onOpenChange: (open) => {
      if (!open) {
        closeLightbox();
      }
    },
  });

  const { getFloatingProps, getItemProps } = useInteractions([
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
    useListNavigation(context, {
      loop,
      virtual: true,
      listRef: imagesRef,
      activeIndex: selected,
      selectedIndex: selected,
      orientation: 'both',
      focusItemOnHover: false,
      openOnArrowKeyDown: false,
      scrollItemIntoView: { inline: 'nearest' },
      onNavigate: (index) => {
        if (index !== null && index !== selected) {
          imagesRef.current[index]?.focus();
          onSelect(index);
        }
      },
    }),
  ]);

  const preserveFocus = useCallback(
    (index: number) => {
      // Prevent losing focus after switching to
      // the first or last image in non-looping mode
      if (!loop && (index === 0 || index === count - 1)) {
        imagesRef.current[index]?.focus();
      }
    },
    [loop, count],
  );

  const closeLightbox = useCallback(() => {
    elements.floating?.classList.add(styles.willhide);
    afterTransition(elements.floating, () => {
      onSelect(undefined);
    });
  }, [elements.floating, onSelect]);

  const selectPrev = useCallback(() => {
    const prevIndex = selected === 0 ? count - 1 : selected - 1;
    onSelect(prevIndex);
    preserveFocus(prevIndex);
  }, [count, selected, preserveFocus, onSelect]);

  const selectNext = useCallback(() => {
    const nextIndex = selected === count - 1 ? 0 : selected + 1;
    onSelect(nextIndex);
    preserveFocus(nextIndex);
  }, [count, selected, preserveFocus, onSelect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imagesRef.current.indexOf(entry.target as HTMLElement);
            if (index !== -1 && index !== selected) {
              onSelect(index);
            }
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

    return () => {
      observer.disconnect();
    };
  }, [elements.floating, selected, onSelect]);

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
                  id={`${id}${index}`}
                  data-lightbox-image={index}
                  data-selected={index === selected}
                  tabIndex={index === selected ? 0 : -1}
                  {...getItemProps()}
                >
                  {renderImage({ ...image, alt: image.alt ?? `Image ${index + 1} of ${count}` })}
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
            {showNext && (
              <Button
                type="button"
                variant="tertiary"
                data-lightbox-next
                aria-label="next image"
                icon={<Icon name="arrow-right" />}
                className={styles.next}
                onClick={selectNext}
              />
            )}
            {showPrev && (
              <Button
                type="button"
                variant="tertiary"
                data-lightbox-prev
                aria-label="previous image"
                icon={<Icon name="arrow-left" />}
                className={styles.prev}
                onClick={selectPrev}
              />
            )}
          </div>
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};

Lightbox.Thumbnails = Thumbnails;
