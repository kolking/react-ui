import React from 'react';
import { render, screen } from '@testing-library/react';

import { Switch } from './Switch';
import styles from './styles/switch.module.scss';

describe('Switch', () => {
  it('renders checkbox input', () => {
    render(<Switch />);

    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Switch label="Enable feature" />);

    expect(screen.getByText('Enable feature')).toBeInTheDocument();
  });

  it('applies size and checkedColor via css variables', () => {
    render(<Switch size="lg" checkedColor="hotpink" />);

    const input = screen.getByRole('checkbox');
    const root = input.closest('label')!;
    expect(root.style.getPropertyValue('--size')).toBe('var(--size-lg)');
    expect(root.style.getPropertyValue('--checked-color')).toBe('hotpink');
  });

  it('sets invalid state when error is provided', () => {
    render(<Switch error="Required" />);

    const input = screen.getByRole('checkbox');
    expect(input.dataset.invalid).toBe('true');
  });

  it('marks switch as required', () => {
    render(<Switch required />);

    const input = screen.getByRole('checkbox');
    const root = input.closest('label')!;
    expect(root.dataset.required).toBe('true');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className without removing default class', () => {
    render(<Switch label="Toggle me" className="custom-class" />);

    const root = screen.getByText('Toggle me').closest('label')!;
    expect(root.classList.contains(styles.switch)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
