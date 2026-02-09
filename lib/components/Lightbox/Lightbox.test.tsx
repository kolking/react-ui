import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';

import { Lightbox } from './Lightbox';
import styles from './styles.module.scss';

const images = [{ src: '/1.jpg', alt: 'First' }, { src: '/2.jpg' }, { src: '/3.jpg' }];

vi.mock('../../utils/helpers', async () => {
  const actual = await vi.importActual('../../utils/helpers');

  return {
    ...actual,
    afterTransition: (_el: HTMLElement | null, cb: () => void) => cb(),
  };
});

describe('Lightbox', () => {
  class IntersectionObserverMock {
    static instances: IntersectionObserverMock[] = [];
    callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      IntersectionObserverMock.instances.push(this);
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
  });

  it('renders when selected is defined', () => {
    render(<Lightbox images={images} selected={0} onSelect={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'images' })).toBeInTheDocument();
  });

  it('renders correct number of images', () => {
    render(<Lightbox images={images} selected={1} onSelect={vi.fn()} />);
    const figures = screen.getAllByRole('group');
    expect(figures).toHaveLength(images.length);
    figures.forEach((figure, index) => {
      expect(figure).toHaveAccessibleName(`${index + 1} of ${images.length}`);
    });
  });

  it('marks selected image correctly', () => {
    render(<Lightbox images={images} selected={1} onSelect={vi.fn()} />);
    const selected = screen.getByRole('group', { current: true });
    expect(selected).toHaveAttribute('data-lightbox-image', '1');
    expect(selected).toHaveAccessibleName('2 of 3');
  });

  it('calls onSelect when next / prev buttons are clicked', async () => {
    const onSelect = vi.fn();
    const { rerender } = render(
      <Lightbox loop={false} images={images} selected={0} onSelect={onSelect} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'next image' }));
    expect(onSelect).toHaveBeenCalledWith(1);

    onSelect.mockClear();
    rerender(<Lightbox loop={false} images={images} selected={1} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'previous image' }));
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('switches to the last image from the first one (loop)', () => {
    const onSelect = vi.fn();
    render(<Lightbox images={images} selected={0} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'previous image' }));
    expect(onSelect).toHaveBeenCalledWith(images.length - 1);
  });

  it('switches to the first image from the last one (loop)', () => {
    const onSelect = vi.fn();
    render(<Lightbox images={images} selected={2} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button', { name: 'next image' }));
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('closes lightbox when close button is clicked', () => {
    const onSelect = vi.fn();
    render(<Lightbox images={images} selected={1} onSelect={onSelect} />);

    const dialog = screen.getByRole('dialog');
    fireEvent.click(screen.getByRole('button', { name: 'close lightbox' }));
    expect(dialog.classList.contains(styles.willhide)).toBe(true);
    expect(onSelect).toHaveBeenCalledWith(undefined);
  });

  it('closes lightbox when Escape is pressed', () => {
    const onSelect = vi.fn();
    render(<Lightbox images={images} selected={1} onSelect={onSelect} />);

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(dialog.classList.contains(styles.willhide)).toBe(true);
    expect(onSelect).toHaveBeenCalledWith(undefined);
  });

  it('uses default alt text when alt is not provided', () => {
    render(<Lightbox images={images} selected={0} onSelect={vi.fn()} />);
    expect(screen.getByAltText('Image 2 of 3')).toBeInTheDocument();
  });

  it('uses renderImage when provided', () => {
    const renderImage = vi.fn((img) => <img src={img.src} alt={`Custom ${img.alt}`} />);

    render(<Lightbox images={images} selected={0} onSelect={vi.fn()} renderImage={renderImage} />);
    expect(renderImage).toHaveBeenCalled();
    expect(screen.getByAltText('Custom First')).toBeInTheDocument();
  });

  it('applies default and custom className', () => {
    render(<Lightbox className="custom-class" images={images} selected={0} onSelect={vi.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog.classList.contains(styles.lightbox)).toBe(true);
    expect(dialog.classList.contains('custom-class')).toBe(true);
  });

  it('calls onSelect when image enters viewport', async () => {
    const onSelect = vi.fn();
    render(<Lightbox images={images} selected={0} onSelect={onSelect} />);

    const figures = screen.getAllByRole('group');
    expect(figures).toHaveLength(images.length);

    const lastInstanceIndex = IntersectionObserverMock.instances.length - 1;
    const observerInstance = IntersectionObserverMock.instances[lastInstanceIndex];

    await waitFor(() => {
      figures.forEach((figure) => {
        expect(observerInstance.observe).toHaveBeenCalledWith(figure);
      });
    });

    // Simulates second image intersection
    act(() => {
      const entries = figures.map((figure, index) => ({
        target: figure,
        isIntersecting: index === 1,
      }));
      observerInstance.callback(
        entries as unknown as IntersectionObserverEntry[],
        observerInstance as unknown as IntersectionObserver,
      );
    });

    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('navigates with arrow keys and calls onSelect', () => {
    const onSelect = vi.fn();
    const { rerender } = render(<Lightbox images={images} selected={1} onSelect={onSelect} />);

    const selected1 = screen.getByRole('group', { current: true });
    fireEvent.keyDown(selected1, { key: 'ArrowRight' });
    expect(onSelect).toHaveBeenCalledWith(2);

    onSelect.mockClear();
    rerender(<Lightbox loop={false} images={images} selected={2} onSelect={onSelect} />);

    const selected2 = screen.getByRole('group', { current: true });
    fireEvent.keyDown(selected2, { key: 'ArrowLeft' });
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
