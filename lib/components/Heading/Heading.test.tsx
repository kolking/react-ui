import { render, screen } from '@testing-library/react';

import { Heading } from './Heading';
import styles from './styles.module.scss';

describe('Heading', () => {
  it('renders simple heading without children', () => {
    render(<Heading data-testid="root" title="Hello" />);

    const root = screen.getByTestId('root');
    expect(root.dataset.heading).toBe('h2');
    expect(root.textContent).toBe('Hello');
    expect(root.tagName).toBe('H2');
  });

  it('renders heading with custom "as" element', () => {
    render(<Heading data-testid="root" title="Heading" as="h1" />);

    const root = screen.getByTestId('root');
    expect(root.dataset.heading).toBe('h1');
    expect(root.tagName).toBe('H1');
  });

  it('renders heading with children (accessory)', () => {
    render(
      <Heading data-testid="root" title="Heading" as="h3">
        <span>Accessory</span>
      </Heading>,
    );

    const title = screen.getByText('Heading');
    expect(title).toBeDefined();
    expect(title.tagName).toBe('H3');
    expect(screen.getByText('Accessory')).toBeInTheDocument();
  });

  it('applies cssProps correctly', () => {
    render(
      <Heading data-testid="root" title="Heading" margin={10} marginStart={5} marginEnd={15} />,
    );

    const root = screen.getByTestId('root');
    expect(root.style.getPropertyValue('--margin')).toBe('10px');
    expect(root.style.getPropertyValue('--margin-start')).toBe('5px');
    expect(root.style.getPropertyValue('--margin-end')).toBe('15px');
  });

  it('merges custom className', () => {
    render(<Heading data-testid="root" title="Heading" className="custom-class" />);

    const root = screen.getByTestId('root');
    expect(root.classList.contains(styles.h2)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
