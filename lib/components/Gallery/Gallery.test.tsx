import { render, screen } from '@testing-library/react';

import { Gallery } from './Gallery';
import styles from './styles.module.scss';

describe('Gallery', () => {
  const observeMock = vi.fn();
  const unobserveMock = vi.fn();
  const disconnectMock = vi.fn();

  beforeEach(() => {
    class ResizeObserverMock {
      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = disconnectMock;
    }

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  it('renders with default props and children', () => {
    render(
      <Gallery data-testid="root">
        <div>Child</div>
      </Gallery>,
    );

    const root = screen.getByTestId('root');
    expect(root.dataset.gallery).toBe('true');
    expect(screen.getByText('Child')).toBeDefined();
  });

  it('applies cssProps correctly', () => {
    render(<Gallery data-testid="root" gap={10} itemSize={100} marginStart={5} marginEnd={15} />);

    const root = screen.getByTestId('root');
    expect(root.style.getPropertyValue('--gap')).toBe('10px');
    expect(root.style.getPropertyValue('--item-size')).toBe('100px');
    expect(root.style.getPropertyValue('--margin-start')).toBe('5px');
    expect(root.style.getPropertyValue('--margin-end')).toBe('15px');
  });

  it('updates columns state when ResizeObserver fires', () => {
    const { rerender, unmount } = render(<Gallery data-testid="root" />);

    const root = screen.getByTestId('root');
    expect(observeMock).toHaveBeenCalledWith(root);

    rerender(<Gallery data-testid="root" cols={5} />);
    expect(unobserveMock).toHaveBeenCalledWith(root);

    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Gallery data-testid="root" className="custom-class" />);

    const root = screen.getByTestId('root');
    expect(root.classList.contains(styles.gallery)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
