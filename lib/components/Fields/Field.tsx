import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import styles from './styles/field.module.scss';

export interface FieldConfig {
  id?: string;
  label?: React.ReactNode;
  labelAccessory?: React.ReactNode;
  help?: React.ReactNode;
  required?: boolean;
  className?: string;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
}

export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  label?: React.ReactNode;
  required?: boolean;
};

export const FieldLabel = ({ label, required, className, children, ...props }: FieldLabelProps) => (
  <div data-field-header className={styles.header}>
    <label
      {...props}
      data-field-label
      data-required={required}
      className={cn(styles.label, className)}
    >
      {label}
    </label>
    {React.Children.toArray(children).length > 0 && (
      <div data-field-accessory className={styles.accessory}>
        {children}
      </div>
    )}
  </div>
);

export type FieldHelpProps = React.HTMLAttributes<HTMLDivElement>;

export const FieldHelp = ({ className, children, ...props }: FieldHelpProps) => (
  <small {...props} data-field-help className={cn(styles.help, className)}>
    {children}
  </small>
);

export type FieldProps = React.HTMLAttributes<HTMLDivElement> & FieldConfig;

export const Field = ({
  id,
  label,
  labelAccessory,
  help,
  required,
  minWidth,
  maxWidth,
  className,
  children,
  ...props
}: FieldProps) => (
  <div
    {...props}
    data-field={id || true}
    className={cn(styles.field, className)}
    style={{ ...props.style, ...cssProps({ minWidth, maxWidth }) }}
  >
    {label && (
      <FieldLabel htmlFor={id} label={label} required={required}>
        {labelAccessory}
      </FieldLabel>
    )}
    {children}
    {help && <FieldHelp>{help}</FieldHelp>}
  </div>
);
