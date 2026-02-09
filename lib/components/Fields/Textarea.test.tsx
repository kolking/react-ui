import React from 'react';
import { render, screen } from '@testing-library/react';

import { Textarea } from './Textarea';
import styles from './styles/input.module.scss';

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea.dataset.textarea).toBeDefined();
  });

  it('renders native textarea when autosize is false', () => {
    render(<Textarea autosize={false} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.dataset.autosize).toBe('false');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('marks textarea as invalid when error is provided', () => {
    render(<Textarea error="Required" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.dataset.invalid).toBe('true');
  });

  it('applies size via inline styles', () => {
    render(<Textarea size="lg" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.style.getPropertyValue('--size')).toBe('var(--size-lg)');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();

    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.classList.contains(styles.textarea)).toBe(true);
    expect(textarea.classList.contains('custom-class')).toBe(true);
  });
});
