import { render, screen } from '@testing-library/react';

import { Button } from './Button';
import styles from './styles.module.scss';

vi.mock('../Spinner', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

describe('Button', () => {
  it('renders as button by default', () => {
    render(<Button title="Click me" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('supports polymorphic as prop', () => {
    render(<Button as="a" href="/test" title="Link" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies variant and scheme data attributes', () => {
    render(<Button title="Test" variant="secondary" scheme="negative" />);

    const button = screen.getByRole('button');
    expect(button.dataset.button).toBe('secondary');
    expect(button.dataset.scheme).toBe('negative');
  });

  it('applies size and width css props', () => {
    render(<Button title="Test" size="lg" minWidth={120} maxWidth="300px" />);

    const button = screen.getByRole('button');
    expect(button.style.getPropertyValue('--size')).toBe('var(--size-lg)');
    expect(button.style.getPropertyValue('--min-width')).toBe('120px');
    expect(button.style.getPropertyValue('--max-width')).toBe('300px');
  });

  it('renders children wrapped in span', () => {
    const { container } = render(<Button>Content</Button>);

    const span = container.querySelector('span');
    expect(span?.textContent).toBe('Content');
  });

  it('renders icon at start by default', () => {
    render(<Button title="Test" icon={<svg role="img" data-icon />} />);

    const icon = screen.getByRole('img');
    const text = screen.getByText('Test');
    expect(icon.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders icon at end when iconPosition="end"', () => {
    render(<Button title="Test" icon={<svg role="img" data-icon />} iconPosition="end" />);

    const icon = screen.getByRole('img');
    const text = screen.getByText('Test');
    expect(text.compareDocumentPosition(icon) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders spinner and aria-live when busy', () => {
    render(<Button title="Loading" busy />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Button title="Disabled" disabled />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies custom className', () => {
    render(<Button title="Test" className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button.classList.contains(styles.button)).toBe(true);
    expect(button.classList.contains('custom-class')).toBe(true);
  });
});
