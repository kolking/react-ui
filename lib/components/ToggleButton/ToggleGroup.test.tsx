import { render, screen, fireEvent } from '@testing-library/react';

import { ToggleGroup } from './ToggleGroup';
import { ToggleButton } from './ToggleButton';
import styles from './styles.module.scss';

describe('ToggleGroup', () => {
  const buttons = [
    <ToggleButton key="0" title="Uno" />,
    <ToggleButton key="1" title="Dos" />,
    <ToggleButton key="2" title="Tres" />,
  ];

  it('renders the group with correct number of buttons', () => {
    render(<ToggleGroup>{buttons}</ToggleGroup>);

    const group = screen.getByRole('radiogroup');
    const radios = screen.getAllByRole('radio');
    expect(group.dataset.toggleGroup).toBeDefined();
    expect(radios.length).toBe(buttons.length);
  });

  it('sets the first button as selected by default', () => {
    render(<ToggleGroup>{buttons}</ToggleGroup>);

    const radios = screen.getAllByRole('radio');
    expect(radios[0].dataset.selected).toBe('true');
    expect(radios[1].dataset.selected).toBe('false');
    expect(radios[2].dataset.selected).toBe('false');
  });

  it('selects the button based on selected prop', () => {
    render(<ToggleGroup selected={1}>{buttons}</ToggleGroup>);

    const radios = screen.getAllByRole('radio');
    expect(radios[0].dataset.selected).toBe('false');
    expect(radios[1].dataset.selected).toBe('true');
    expect(radios[2].dataset.selected).toBe('false');
  });

  it('updates selected state when a button is clicked', () => {
    const handleSelect = vi.fn();
    render(<ToggleGroup onSelect={handleSelect}>{buttons}</ToggleGroup>);

    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[2]);
    expect(handleSelect).toHaveBeenCalledWith(2);
    expect(radios[0].dataset.selected).toBe('false');
    expect(radios[1].dataset.selected).toBe('false');
    expect(radios[2].dataset.selected).toBe('true');
  });

  it('respects disabled prop and prevents selection change', () => {
    render(<ToggleGroup disabled>{buttons}</ToggleGroup>);

    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[1]);

    // Selected should remain the first button
    expect(radios[0].dataset.selected).toBe('true');
    expect(radios[1].dataset.selected).toBe('false');
    expect(radios[1]).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<ToggleGroup className="custom-class">{buttons}</ToggleGroup>);

    const group = screen.getByRole('radiogroup');
    expect(group.classList.contains(styles.group)).toBe(true);
    expect(group.classList.contains('custom-class')).toBe(true);
  });
});
