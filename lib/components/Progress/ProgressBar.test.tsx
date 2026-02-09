import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';
import styles from './styles-bar.module.scss';

describe('ProgressBar', () => {
  it('renders as progressbar with correct aria attributes', () => {
    render(<ProgressBar value={40} />);

    const bar = screen.getByRole('progressbar');
    expect(bar.dataset.progressBar).toBeDefined();
    expect(bar.dataset.progressValue).toBe('40');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
    expect(bar.getAttribute('aria-valuenow')).toBe('40');
    expect(bar.getAttribute('aria-label')).toBe('40 percent');
  });

  it('clamps value between 0 and 100', () => {
    render(<ProgressBar value={150} />);

    const bar = screen.getByRole('progressbar');
    expect(bar.dataset.progressValue).toBe('100');
    expect(bar.getAttribute('aria-valuenow')).toBe('100');
  });

  it('renders indeterminate state when value is null', () => {
    render(<ProgressBar value={null} />);

    const bar = screen.getByRole('progressbar');
    expect(bar.dataset.progressValue).toBe('indeterminate');
    expect(bar.getAttribute('aria-valuenow')).toBeNull();
    expect(bar.getAttribute('aria-label')).toBe('indeterminate');
  });

  it('sets indicator width based on progress value', () => {
    render(<ProgressBar value={25} />);

    const bar = screen.getByRole('progressbar');
    const indicator = bar.querySelector('[data-progress-bar-indicator]') as HTMLElement;
    expect(indicator).toBeTruthy();
    expect(indicator.style.width).toBe('25%');
  });

  it('applies css variables from props', () => {
    render(<ProgressBar value={50} width={200} height={10} color="red" trackColor="black" />);

    const bar = screen.getByRole('progressbar');
    expect(bar.style.getPropertyValue('--width')).toBe('200px');
    expect(bar.style.getPropertyValue('--height')).toBe('10px');
    expect(bar.style.getPropertyValue('--color')).toBe('red');
    expect(bar.style.getPropertyValue('--track-color')).toBe('black');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<ProgressBar ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<ProgressBar value={10} className="custom-class" />);

    const bar = screen.getByRole('progressbar');
    expect(bar.classList.contains(styles.progress)).toBe(true);
    expect(bar.classList.contains('custom-class')).toBe(true);
  });
});
