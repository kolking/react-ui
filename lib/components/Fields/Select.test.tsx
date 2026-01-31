import React from 'react';
import { render, screen } from '@testing-library/react';

import { Select } from './Select';
import styles from './styles/input.module.scss';

describe('Select', () => {
  it('renders select element', () => {
    render(<Select />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.dataset.select).toBeDefined();
  });

  it('marks select as invalid when error is provided', () => {
    render(<Select error="Required" />);

    const select = screen.getByRole('combobox');
    expect(select.dataset.invalid).toBe('true');
  });

  it('applies size via inline styles', () => {
    render(<Select size="lg" />);

    const select = screen.getByRole('combobox');
    expect(select.style.getPropertyValue('--size')).toBe('var(--size-lg)');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>();

    render(<Select ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('applies custom className', () => {
    render(<Select className="custom-class" />);

    const select = screen.getByRole('combobox');
    expect(select.classList.contains(styles.select)).toBe(true);
    expect(select.classList.contains('custom-class')).toBe(true);
  });
});
