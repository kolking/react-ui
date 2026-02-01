import { render, screen, fireEvent } from '@testing-library/react';

import { Thumbnail } from './Thumbnail';

describe('Thumbnail', () => {
  const scrollIntoViewMock = vi.fn();

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoViewMock,
    });
  });

  afterEach(() => {
    scrollIntoViewMock.mockClear();
  });

  it('renders with correct accessibility attributes', () => {
    render(
      <Thumbnail index={0} selected={false} onSelect={vi.fn()}>
        thumb
      </Thumbnail>,
    );

    const option = screen.getByRole('option');
    expect(option).toHaveAttribute('aria-selected', 'false');
    expect(option.dataset.selected).toBe('false');
    expect(option.dataset.lightboxThumbnail).toBe('0');
  });

  it('calls onSelect with index on click', () => {
    const onSelect = vi.fn();
    render(
      <Thumbnail index={3} selected={false} onSelect={onSelect}>
        thumb
      </Thumbnail>,
    );

    fireEvent.click(screen.getByRole('option'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(3);
  });

  it('scrolls into view when selected', () => {
    render(
      <Thumbnail index={1} selected={true} onSelect={vi.fn()}>
        thumb
      </Thumbnail>,
    );

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ inline: 'center' });
  });

  it('does not scroll into view when not selected', () => {
    render(
      <Thumbnail index={1} selected={false} onSelect={vi.fn()}>
        thumb
      </Thumbnail>,
    );

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });

  it('scrolls into view when selected changes from false to true', () => {
    const { rerender } = render(
      <Thumbnail index={1} selected={false} onSelect={vi.fn()}>
        thumb
      </Thumbnail>,
    );

    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    rerender(
      <Thumbnail index={1} selected={true} onSelect={vi.fn()}>
        thumb
      </Thumbnail>,
    );

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });
});
