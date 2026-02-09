import React from 'react';
import { render, screen } from '@testing-library/react';

import { Input } from './Input';
import checkboxStyles from './styles/checkbox.module.scss';
import inputStyles from './styles/input.module.scss';

const classNames = {
  checkbox: checkboxStyles.input,
  radio: checkboxStyles.input,
  date: inputStyles.date,
  datetime: inputStyles.date,
  'datetime-local': inputStyles.date,
  month: inputStyles.date,
  week: inputStyles.date,
  time: inputStyles.time,
  number: inputStyles.number,
  search: inputStyles.search,
  range: inputStyles.range,
};

describe('Input', () => {
  it('renders text input by default', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.dataset.input).toBe('text');
  });

  it('renders wrapper when prefix is provided', () => {
    render(<Input prefix="@" />);

    const input = screen.getByRole('textbox');
    const wrapper = input.closest('[data-input-wrapper]');
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText('@')).toBeInTheDocument();
  });

  it('renders wrapper when children provided', () => {
    render(
      <Input>
        <button>Button</button>
      </Input>,
    );

    const input = screen.getByRole('textbox');
    const wrapper = input.closest('[data-input-wrapper]');
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies invalid data attribute when error is true', () => {
    render(<Input error="Oops" />);

    const input = screen.getByRole('textbox');
    expect(input.dataset.invalid).toBe('true');
  });

  it('applies invalid data attribute on the wrapper', () => {
    render(<Input error="Oops" prefix="$" />);

    const input = screen.getByRole('textbox');
    const wrapper = input.closest('[data-input-wrapper]') as HTMLElement;
    expect(wrapper.dataset.invalid).toBe('true');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it.each(Object.entries(classNames))('applies proper className for %s', (type, className) => {
    render(<Input data-testid="input" type={type} />);

    const input = screen.getByTestId('input');
    expect(input.getAttribute('type')).toBe(type);
    expect(input.classList.contains(className)).toBe(true);
  });

  it('applies custom className (non-wrapped)', () => {
    render(<Input className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input.classList.contains(inputStyles.input)).toBe(true);
    expect(input.classList.contains('custom-class')).toBe(true);
  });

  it('applies custom className (wrapped)', () => {
    render(<Input prefix="@" className="custom-class" />);

    const input = screen.getByRole('textbox');
    const wrapper = input.closest('[data-input-wrapper]');
    expect(wrapper?.classList.contains(inputStyles.wrapper)).toBe(true);
    expect(wrapper?.classList.contains('custom-class')).toBe(true);
  });
});
