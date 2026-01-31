import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Field, FieldLabel, FieldDescription } from './Field';
import { Input } from './Input';
import styles from './styles/field.module.scss';

describe('Field', () => {
  it('renders field container', () => {
    render(
      <Field data-testid="field">
        <input />
      </Field>,
    );

    const field = screen.getByTestId('field');
    const input = screen.getByRole('textbox');
    expect(field).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <Field id="email" label="Email">
        <input id="email" />
      </Field>,
    );

    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('marks label as required', () => {
    render(
      <Field id="email" label="Email" required>
        <input id="email" />
      </Field>,
    );

    const label = screen.getByText('Email');
    expect(label.dataset.required).toBe('true');
  });

  it('renders label accessory', () => {
    render(
      <Field id="email" label="Email" labelAccessory={<span>optional</span>}>
        <input id="email" />
      </Field>,
    );

    const accessory = screen.getByText('optional');
    expect(accessory.closest('[data-field-accessory]')).toBeTruthy();
  });

  it('renders help description', () => {
    render(
      <Field help="Helper text">
        <input />
      </Field>,
    );

    const description = screen.getByText('Helper text');
    expect(description.tagName).toBe('SMALL');
    expect(description.classList.contains(styles.description)).toBe(true);
  });

  it('links label and input via htmlFor / id', async () => {
    const user = userEvent.setup();
    render(
      <Field id="email" label="Email">
        <Input id="email" />
      </Field>,
    );

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email');

    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();

    await user.click(label);
    expect(input).toHaveFocus();
  });

  it('applies custom className', () => {
    render(
      <Field data-testid="field" className="custom-class">
        <input />
      </Field>,
    );

    const field = screen.getByTestId('field');
    expect(field.classList.contains(styles.field)).toBe(true);
    expect(field.classList.contains('custom-class')).toBe(true);
  });
});

describe('FieldLabel', () => {
  it('renders label text', () => {
    render(<FieldLabel label="Username" />);

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label.classList.contains(styles.label)).toBe(true);
  });

  it('applies custom className', () => {
    render(<FieldLabel label="Username" className="custom-class" />);

    const label = screen.getByText('Username');
    expect(label.classList.contains(styles.label)).toBe(true);
    expect(label.classList.contains('custom-class')).toBe(true);
  });
});

describe('FieldDescription', () => {
  it('renders description text', () => {
    render(<FieldDescription>Help text</FieldDescription>);

    const description = screen.getByText('Help text');
    expect(description).toBeInTheDocument();
    expect(description.classList.contains(styles.description)).toBe(true);
  });

  it('applies custom className', () => {
    render(<FieldDescription className="custom-class">Help text</FieldDescription>);

    const description = screen.getByText('Help text');
    expect(description.classList.contains(styles.description)).toBe(true);
    expect(description.classList.contains('custom-class')).toBe(true);
  });
});
