import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Numeric } from './Numeric';
import styles from './styles/numeric.module.scss';

describe('Numeric', () => {
  it('renders input with type number and default buttons', () => {
    render(<Numeric />);

    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();

    const increaseButton = screen.getByRole('button', { name: 'increase' });
    const decreaseButton = screen.getByRole('button', { name: 'decrease' });
    expect(increaseButton).toBeInTheDocument();
    expect(decreaseButton).toBeInTheDocument();
  });

  it('increments and decrements value on button clicks', () => {
    const onChange = vi.fn();
    render(<Numeric defaultValue={5} min={0} max={10} onChange={onChange} />);

    const input = screen.getByRole<HTMLInputElement>('spinbutton');
    const increaseButton = screen.getByRole('button', { name: 'increase' });
    const decreaseButton = screen.getByRole('button', { name: 'decrease' });

    fireEvent.click(increaseButton);
    expect(Number(input.value)).toBe(6);
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.click(decreaseButton);
    expect(Number(input.value)).toBe(5);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('disables buttons when input is disabled or readOnly', () => {
    render(<Numeric disabled />);

    const increaseButton = screen.getByRole('button', { name: 'increase' });
    const decreaseButton = screen.getByRole('button', { name: 'decrease' });
    expect(increaseButton).toBeDisabled();
    expect(decreaseButton).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Numeric ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('supports custom aria-labels for buttons', () => {
    render(<Numeric labelIncrease="plus" labelDecrease="minus" />);

    expect(screen.getByRole('button', { name: 'plus' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'minus' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Numeric className="custom-class" />);

    const inputWrapper = screen.getByRole('spinbutton').closest('[data-input-wrapper]')!;
    expect(inputWrapper.classList.contains(styles.numeric)).toBe(true);
    expect(inputWrapper.classList.contains('custom-class')).toBe(true);
  });
});
