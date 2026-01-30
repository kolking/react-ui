import { render, screen, fireEvent } from '@testing-library/react';

import { Segmented } from './Segmented';
import styles from './styles.module.scss';

type TestItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

const items: TestItem[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('Segmented', () => {
  it('renders the segmented control with correct number of items', () => {
    render(<Segmented items={items} />);

    const group = screen.getByRole('radiogroup');
    expect(group.dataset.segmented).toBeDefined();

    const buttons = screen.getAllByRole('radio');
    expect(buttons.length).toBe(items.length);
  });

  it('sets the first item as selected by default', () => {
    render(<Segmented items={items} />);

    const buttons = screen.getAllByRole('radio');
    expect(buttons[0].dataset.selected).toBe('true');
    expect(buttons[1].dataset.selected).toBe('false');
    expect(buttons[2].dataset.selected).toBe('false');
  });

  it('renders with a selected prop', () => {
    render(<Segmented items={items} selected="b" />);

    const buttons = screen.getAllByRole('radio');
    expect(buttons[0].dataset.selected).toBe('false');
    expect(buttons[1].dataset.selected).toBe('true');
    expect(buttons[2].dataset.selected).toBe('false');
  });

  it('calls onSelect when an item is clicked', () => {
    const handleSelect = vi.fn();
    render(<Segmented items={items} onSelect={handleSelect} />);

    const buttons = screen.getAllByRole('radio');
    fireEvent.click(buttons[1]);
    expect(handleSelect).toHaveBeenCalledWith('b');
    expect(buttons[1].dataset.selected).toBe('true');
    expect(buttons[0].dataset.selected).toBe('false');
  });

  it('does not select a disabled item when clicked', () => {
    const handleSelect = vi.fn();
    render(<Segmented items={items} onSelect={handleSelect} />);

    const buttons = screen.getAllByRole('radio');
    fireEvent.click(buttons[2]);
    expect(handleSelect).not.toHaveBeenCalled();
    expect(buttons[2].dataset.selected).toBe('false');
  });

  it('applies the disabled prop to all items', () => {
    render(<Segmented items={items} disabled />);

    const buttons = screen.getAllByRole('radio');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('sets flexBasis style when segmentsWidth is equal', () => {
    render(<Segmented items={items} segmentsWidth="equal" />);

    const group = screen.getByRole('radiogroup');
    expect(group.style.getPropertyValue('--flex-basis')).toBe('0px');
  });

  it('applies custom className', () => {
    render(<Segmented items={items} className="custom-class" />);

    const group = screen.getByRole('radiogroup');
    expect(group.classList.contains(styles.segmented)).toBe(true);
    expect(group.classList.contains('custom-class')).toBe(true);
  });
});
