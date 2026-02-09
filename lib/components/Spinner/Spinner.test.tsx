import { render, screen } from '@testing-library/react';

import { Spinner } from './Spinner';
import styles from './styles.module.scss';

describe('Spinner', () => {
  it('renders spinner with default attributes', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner.getAttribute('aria-label')).toBe('loading');
    expect(spinner.dataset.spinner).toBeDefined();
    expect(spinner.dataset.overlay).toBeUndefined();
  });

  it('supports overlay mode', () => {
    render(<Spinner overlay />);

    const spinner = screen.getByRole('status');
    expect(spinner.dataset.overlay).toBe('true');
  });

  it('applies size and color styles via css props', () => {
    render(<Spinner size={24} color="red" />);

    const spinner = screen.getByRole('status');
    expect(spinner.style.getPropertyValue('--size')).toBe('24px');
    expect(spinner.style.getPropertyValue('--color')).toBe('red');
  });

  it('applies overlayColor style when provided', () => {
    render(<Spinner overlay overlayColor="rgb(0 0 0 / 50%)" />);

    const spinner = screen.getByRole('status');
    expect(spinner.style.getPropertyValue('--overlay-color')).toBe('rgb(0 0 0 / 50%)');
  });

  it('renders svg with 2 circles inside', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    const svg = spinner.querySelector('svg');
    const circles = svg?.querySelectorAll('circle');

    expect(svg).toBeInTheDocument();
    expect(circles).toHaveLength(2);
  });

  it('applies custom className', () => {
    render(<Spinner className="custom-class" />);

    const spinner = screen.getByRole('status');
    expect(spinner.classList.contains(styles.container)).toBe(true);
    expect(spinner.classList.contains('custom-class')).toBe(true);
  });
});
