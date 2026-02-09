import { render, screen, fireEvent } from '@testing-library/react';

import { Thumbnails } from './Thumbnails';
import styles from './styles.module.scss';

type Image = {
  src: string;
  alt?: string;
};

const images: Image[] = [
  { src: '/1.jpg', alt: 'First' },
  { src: '/2.jpg' },
  { src: '/3.jpg', alt: 'Third' },
];

describe('Thumbnails', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      value: vi.fn(),
    });
  });

  it('returns null when images length is 1 or less', () => {
    const { container } = render(
      <Thumbnails images={[images[0]]} selected={0} onSelect={vi.fn()} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders listbox when more than one image', () => {
    render(<Thumbnails images={images} selected={0} onSelect={vi.fn()} />);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveAttribute('data-lightbox-thumbnails');
  });

  it('renders correct number of thumbnails', () => {
    render(<Thumbnails images={images} selected={0} onSelect={vi.fn()} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(images.length);
  });

  it('marks selected thumbnail correctly', () => {
    render(<Thumbnails images={images} selected={1} onSelect={vi.fn()} />);

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onSelect with correct index when thumbnail is clicked', () => {
    const onSelect = vi.fn();
    render(<Thumbnails images={images} selected={0} onSelect={onSelect} />);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[2]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('uses default alt text when image alt is not provided', () => {
    render(<Thumbnails images={images} selected={0} onSelect={vi.fn()} />);

    expect(screen.getByAltText('Thumbnail 2')).toBeInTheDocument();
  });

  it('uses renderImage when provided', () => {
    const renderImage = vi.fn((image: Image) => (
      <img src={image.src} alt={`Custom ${image.alt}`} />
    ));

    render(
      <Thumbnails images={images} selected={0} onSelect={vi.fn()} renderImage={renderImage} />,
    );

    expect(renderImage).toHaveBeenCalledTimes(images.length);
    expect(screen.getByAltText('Custom First')).toBeInTheDocument();
  });

  it('applies default and custom className', () => {
    render(<Thumbnails images={images} selected={0} onSelect={vi.fn()} className="custom-class" />);

    const listbox = screen.getByRole('listbox');
    expect(listbox.classList.contains(styles.thumbnails)).toBe(true);
    expect(listbox.classList.contains('custom-class')).toBe(true);
  });
});
