import { render, screen } from '@testing-library/react';

import { Flex } from './Flex';
import styles from './styles.module.scss';

describe('Flex', () => {
  it('renders with default direction', () => {
    render(<Flex data-testid="root" />);

    const root = screen.getByTestId('root');
    expect(root.dataset.flex).toBe('row');
  });

  it('renders with custom direction', () => {
    render(<Flex data-testid="root" direction="column" />);

    const root = screen.getByTestId('root');
    expect(root.dataset.flex).toBe('column');
  });

  it('applies cssProps styles', () => {
    render(<Flex data-testid="root" gap={12} align="center" justify="space-between" />);

    const root = screen.getByTestId('root');
    expect(root.style.getPropertyValue('--gap')).toBe('12px');
    expect(root.style.getPropertyValue('--align')).toBe('center');
    expect(root.style.getPropertyValue('--justify')).toBe('space-between');
  });

  it('respects polymorphic "as" prop', () => {
    render(<Flex as="section" data-testid="root" />);

    const root = screen.getByTestId('root');
    expect(root.tagName).toBe('SECTION');
  });

  it('forwards additional props', () => {
    render(
      <Flex data-testid="root" id="flex-id" aria-label="hello">
        <span>Children</span>
      </Flex>,
    );

    const root = screen.getByTestId('root');
    expect(root).toHaveAttribute('id', 'flex-id');
    expect(root).toHaveAttribute('aria-label', 'hello');
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Flex data-testid="root" className="custom-class" />);

    const root = screen.getByTestId('root');
    expect(root.classList.contains(styles.flex)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
