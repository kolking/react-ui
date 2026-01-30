import { render, screen } from '@testing-library/react';

import { Tag } from './Tag';
import styles from './styles.module.scss';

describe('Tag', () => {
  it('renders with default props and title', () => {
    render(<Tag data-testid="root" title="Hello" />);

    const root = screen.getByTestId('root');
    expect(root.dataset.tag).toBe('default');
    expect(root.dataset.scheme).toBe('gray');
    expect(root.textContent).toBe('Hello');
  });

  it('renders children instead of title when provided', () => {
    render(
      <Tag data-testid="root" title="Title">
        Children
      </Tag>,
    );

    const root = screen.getByTestId('root');
    expect(root.textContent).toBe('Children');
  });

  it('renders icon at start by default', () => {
    render(<Tag data-testid="root" title="Icon before text" icon={<span data-testid="icon" />} />);

    const root = screen.getByTestId('root');
    const icon = screen.getByTestId('icon');
    expect(root.firstChild).toBe(icon);
  });

  it('renders icon at end when iconPosition="end"', () => {
    render(
      <Tag
        data-testid="root"
        title="Icon after text"
        icon={<span data-testid="icon" />}
        iconPosition="end"
      />,
    );

    const root = screen.getByTestId('root');
    const icon = screen.getByTestId('icon');
    expect(root.lastChild).toBe(icon);
  });

  it('applies size and variant/scheme correctly', () => {
    render(<Tag data-testid="root" title="Styled" size="lg" variant="solid" scheme="blue" />);

    const root = screen.getByTestId('root');
    expect(root.dataset.tag).toBe('solid');
    expect(root.dataset.scheme).toBe('blue');
    expect(root.style.getPropertyValue('--size')).toBe('var(--size-lg)');
  });

  it('applies custom className', () => {
    render(<Tag data-testid="root" variant="solid" scheme="indigo" className="custom-class" />);

    const root = screen.getByTestId('root');
    expect(root.classList.contains(styles.tag)).toBe(true);
    expect(root.classList.contains(styles['solid-indigo'])).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
