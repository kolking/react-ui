import { render, screen } from '@testing-library/react';

import { ButtonGroup } from './ButtonGroup';
import styles from './styles.module.scss';

describe('ButtonGroup', () => {
  it('renders container with children', () => {
    render(
      <ButtonGroup data-testid="root">
        <button>One</button>
        <button>Two</button>
      </ButtonGroup>,
    );

    const root = screen.getByTestId('root');
    expect(root).toBeInTheDocument();
    expect(root.children).toHaveLength(2);
  });

  it('applies css props as css variables', () => {
    render(
      <ButtonGroup data-testid="root" minWidth={100} maxWidth="300px" flexBasis="50%">
        <button>One</button>
        <button>Two</button>
      </ButtonGroup>,
    );

    const root = screen.getByTestId('root');
    expect(root.style.getPropertyValue('--min-width')).toBe('100px');
    expect(root.style.getPropertyValue('--max-width')).toBe('300px');
    expect(root.style.getPropertyValue('--flex-basis')).toBe('50%');
  });

  it('merges inline styles', () => {
    render(
      <ButtonGroup data-testid="root" style={{ backgroundColor: 'red' }}>
        <button>One</button>
        <button>Two</button>
      </ButtonGroup>,
    );

    const root = screen.getByTestId('root');
    expect(root.style.backgroundColor).toBe('red');
  });

  it('applies custom className', () => {
    render(
      <ButtonGroup data-testid="root" className="custom-class">
        <button>One</button>
        <button>Two</button>
      </ButtonGroup>,
    );

    const root = screen.getByTestId('root');
    expect(root.classList.contains(styles.group)).toBe(true);
    expect(root.classList.contains('custom-class')).toBe(true);
  });
});
