import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProgressCircular } from './ProgressCircular';
import styles from './styles-circular.module.scss';

describe('ProgressCircular', () => {
  it('renders as progressbar with correct aria attributes', () => {
    render(<ProgressCircular value={40} />);

    const circular = screen.getByRole('progressbar');
    expect(circular.dataset.progressCircular).toBeDefined();
    expect(circular.dataset.progressValue).toBe('40');
    expect(circular.getAttribute('aria-valuemin')).toBe('0');
    expect(circular.getAttribute('aria-valuemax')).toBe('100');
    expect(circular.getAttribute('aria-valuenow')).toBe('40');
    expect(circular.getAttribute('aria-label')).toBe('40 percent');
  });

  it('clamps value between min and max', () => {
    render(<ProgressCircular min={0} max={100} value={150} />);

    const circular = screen.getByRole('progressbar');
    expect(circular.dataset.progressValue).toBe('100');
    expect(circular.getAttribute('aria-valuenow')).toBe('100');
  });

  it('renders indeterminate state when value is null', () => {
    render(<ProgressCircular value={null} />);

    const circular = screen.getByRole('progressbar');
    expect(circular.dataset.progressValue).toBe('indeterminate');
    expect(circular.getAttribute('aria-valuenow')).toBeNull();
    expect(circular.getAttribute('aria-label')).toBe('indeterminate');
  });

  it('sets css value based on progress and min/max', () => {
    render(<ProgressCircular min={0} max={200} value={50} />);

    const circular = screen.getByRole('progressbar');
    expect(circular.style.getPropertyValue('--value')).toBe('25');
  });

  it('passes countdown flag as data attribute', () => {
    render(<ProgressCircular value={30} countdown />);

    const circular = screen.getByRole('progressbar');
    expect(circular.dataset.countdown).toBe('true');
  });

  it('renders children inside inner container', () => {
    render(
      <ProgressCircular value={60}>
        <span>60%</span>
      </ProgressCircular>,
    );

    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('applies css variables from props', () => {
    render(<ProgressCircular value={50} size="5em" thickness={10} color="red" trackColor="blue" />);

    const bar = screen.getByRole('progressbar');
    expect(bar.style.getPropertyValue('--size')).toBe('5em');
    expect(bar.style.getPropertyValue('--thickness')).toBe('10px');
    expect(bar.style.getPropertyValue('--color')).toBe('red');
    expect(bar.style.getPropertyValue('--track-color')).toBe('blue');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<ProgressCircular ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<ProgressCircular value={10} className="custom-class" />);

    const circular = screen.getByRole('progressbar');
    expect(circular.classList.contains(styles.container)).toBe(true);
    expect(circular.classList.contains('custom-class')).toBe(true);
  });
});
