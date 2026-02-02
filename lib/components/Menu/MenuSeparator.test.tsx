import { render, screen } from '@testing-library/react';

import { MenuSeparator } from './MenuSeparator';
import styles from './styles.module.scss';

describe('MenuSeparator', () => {
  it('renders an hr with role separator', () => {
    render(<MenuSeparator />);

    const root = screen.getByRole('separator');
    expect(root).toBeInTheDocument();
    expect(root.tagName).toBe('HR');
  });

  it('applies default and custom className', () => {
    render(<MenuSeparator className="custom-class" />);

    const root = screen.getByRole('separator');
    expect(root.classList.contains(styles.separator)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
