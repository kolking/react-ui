import { render, screen, fireEvent } from '@testing-library/react';

import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  it('renders with default props', () => {
    render(<ToggleButton title="Click me" />);

    const button = screen.getByRole('button');
    expect(button.dataset.toggleButton).toBeDefined();
    expect(button.dataset.selected).toBe('false');
    expect(button.dataset.selected).toBe('false');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.textContent).toBe('Click me');
  });

  it('renders as selected when selected prop is true', () => {
    render(<ToggleButton title="Click me" selected />);

    const button = screen.getByRole('button');
    expect(button.dataset.selected).toBe('true');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('renders correctly with role="radio"', () => {
    render(<ToggleButton title="Option" selected role="radio" />);

    const button = screen.getByRole('radio');
    expect(button.dataset.selected).toBe('true');
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(button.getAttribute('aria-pressed')).toBeNull();
  });

  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ToggleButton title="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<ToggleButton title="Button" className="custom-class" />);

    const group = screen.getByRole('button');
    expect(group.classList.contains('custom-class')).toBe(true);
  });
});
