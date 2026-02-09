import { render, screen, fireEvent } from '@testing-library/react';

import { GalleryItem } from './GalleryItem';
import styles from './styles.module.scss';

describe('GalleryItem', () => {
  it('renders with role button', () => {
    render(<GalleryItem>Image</GalleryItem>);

    const root = screen.getByRole('button');
    expect(root).toBeDefined();
  });

  it('sets data-gallery-image when index is provided', () => {
    render(<GalleryItem index={2}>Image</GalleryItem>);

    const root = screen.getByRole('button');
    expect(root.dataset.galleryImage).toBe('2');
  });

  it('calls onSelect, onClick, and onKeyPress', () => {
    const onClick = vi.fn();
    const onSelect = vi.fn();
    const onKeyDown = vi.fn();

    render(
      <GalleryItem index={3} onSelect={onSelect} onClick={onClick} onKeyDown={onKeyDown}>
        Image
      </GalleryItem>,
    );

    const root = screen.getByRole('button');
    fireEvent.click(root);

    expect(onClick).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith(3);
    expect(onKeyDown).not.toHaveBeenCalled();

    fireEvent.keyDown(root, { code: 'Enter' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it.each([
    {
      index: 4,
      keyCode: 'Enter',
      shouldCall: true,
    },
    {
      index: 5,
      keyCode: 'Space',
      shouldCall: true,
    },
    {
      index: 6,
      keyCode: 'ArrowDown',
      shouldCall: false,
    },
  ])('handles $keyCode key press', ({ keyCode, index, shouldCall }) => {
    const onSelect = vi.fn();

    render(
      <GalleryItem index={index} onSelect={onSelect}>
        Image
      </GalleryItem>,
    );

    const root = screen.getByRole('button');
    fireEvent.keyDown(root, { code: keyCode });

    if (shouldCall) {
      expect(onSelect).toHaveBeenCalledWith(index);
    } else {
      expect(onSelect).not.toHaveBeenCalled();
    }
  });

  it('applies custom className', () => {
    render(<GalleryItem className="custom-class" />);

    const root = screen.getByRole('button');
    expect(root.classList.contains(styles.item)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
