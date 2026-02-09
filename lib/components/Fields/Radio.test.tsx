import React from 'react';
import { render, screen } from '@testing-library/react';

import { Radio } from './Radio';
import styles from './styles/checkbox.module.scss';

describe('Radio', () => {
  it('renders radio input', () => {
    render(<Radio />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Radio label="Option A" />);

    const label = screen.getByLabelText('Option A');
    expect(label).toBeInTheDocument();
  });

  it('applies required data attribute', () => {
    render(<Radio label="Required" required />);

    const label = screen.getByLabelText('Required');
    expect(label.closest('label')?.dataset.required).toBe('true');
  });

  it('forwards checked state to input', () => {
    render(<Radio checked readOnly />);

    const radio = screen.getByRole('radio') as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Radio ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className without removing default class', () => {
    render(<Radio className="custom-class" />);

    const wrapper = screen.getByRole('radio').closest('label');
    expect(wrapper?.classList.contains(styles.radio)).toBe(true);
    expect(wrapper?.classList.contains('custom-class')).toBe(true);
  });
});
