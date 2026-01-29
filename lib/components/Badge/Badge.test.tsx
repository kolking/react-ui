import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';
import styles from './styles.module.scss';

describe('Badge', () => {
  it('returns null when value is falsy', () => {
    const { container } = render(<Badge value={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders value', () => {
    render(<Badge value={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders maxValue+ when value exceeds maxValue', () => {
    render(<Badge value={120} maxValue={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('sets scheme and placement data attributes', () => {
    render(<Badge data-testid="badge" value={1} scheme="blue" placement="bottom-left" />);

    const root = screen.getByTestId('badge');
    expect(root).toHaveAttribute('data-badge', 'blue');
    expect(root).toHaveAttribute('data-placement', 'bottom-left');
  });

  it('adds appear class when becoming visible', () => {
    const { rerender } = render(<Badge value={0} />);

    rerender(<Badge data-testid="badge" value={3} />);

    const root = screen.getByTestId('badge');
    expect(root.classList.contains(styles.appear)).toBe(true);
  });

  it('sets --offset css variable for absolute positioning', () => {
    const spyClientHeight = vi
      .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
      .mockReturnValue(20);

    render(<Badge data-testid="badge" value={1} />);

    const root = screen.getByTestId('badge');
    expect(root.style.getPropertyValue('--offset')).toBe('-5px');

    spyClientHeight.mockRestore();
  });
});
