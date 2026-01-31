import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Range } from './Range';
import styles from './styles/range.module.scss';

describe('Range', () => {
  it('renders range input', () => {
    render(<Range />);

    const input = screen.getByRole('slider');
    expect(input).toBeInTheDocument();
  });

  it('sets initial progress based on value', () => {
    render(<Range min={0} max={100} value={25} />);

    const root = screen.getByRole('slider').closest('[data-range]') as HTMLElement;
    expect(root.style.getPropertyValue('--progress')).toBe('0.25');
  });

  it('updates progress on change', () => {
    render(<Range min={0} max={100} defaultValue={0} />);

    const input = screen.getByRole('slider');
    const root = input.closest('[data-range]') as HTMLElement;
    fireEvent.change(input, { target: { value: '50' } });
    expect(root.style.getPropertyValue('--progress')).toBe('0.5');
  });

  it('calls onChange handler', () => {
    const onChange = vi.fn();
    render(<Range onChange={onChange} />);

    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '80' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders tick marks when ticks array provided', () => {
    render(<Range ticks={[0, 50, 100]} />);

    const ticks = screen.getByRole('list');
    expect(ticks).toBeInTheDocument();
    expect(ticks.children.length).toBe(3);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders tick marks when ticks number provided', () => {
    render(<Range ticks={5} />);

    const ticks = screen.getByRole('list');
    expect(ticks.children.length).toBe(5);
  });

  it('renders no tick marks when less than 2 ticks are provided', () => {
    render(<Range ticks={['lonely tick']} />);
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('renders thumb content when children are provided', () => {
    render(<Range>50%</Range>);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('sets invalid state when error is provided', () => {
    render(<Range error="Invalid value" />);

    const root = screen.getByRole('slider').closest('[data-range]') as HTMLElement;
    expect(root.dataset.invalid).toBe('true');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Range ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className', () => {
    render(<Range className="custom-class" />);

    const root = screen.getByRole('slider').closest('[data-range]')!;
    expect(root.classList.contains(styles.range)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
