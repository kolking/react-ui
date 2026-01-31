import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Checkbox } from './Checkbox';
import styles from './styles/checkbox.module.scss';

describe('Checkbox', () => {
  it('renders checkbox input', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders label if provided', () => {
    render(<Checkbox label="Accept Terms" />);

    const label = screen.getByLabelText('Accept Terms');
    expect(label).toBeInTheDocument();
  });

  it('sets required attribute when required prop is true', () => {
    render(<Checkbox label="Required" required />);

    const label = screen.getByLabelText('Required');
    expect(label.closest('label')?.dataset.required).toBe('true');
  });

  it('can be controlled via checked prop', () => {
    render(<Checkbox defaultChecked />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('updates checked state on user click', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('sets indeterminate state when indeterminate prop is true', () => {
    render(<Checkbox indeterminate />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('does not set indeterminate if checkbox is checked', () => {
    render(<Checkbox defaultChecked indeterminate />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(false);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" />);

    const wrapper = screen.getByRole('checkbox').closest('label')!;
    expect(wrapper.classList.contains(styles.checkbox)).toBe(true);
    expect(wrapper.classList.contains('custom-class')).toBe(true);
  });
});
