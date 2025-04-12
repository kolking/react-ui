import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import { Input, InputProps } from './Input';
import styles from './styles/checkbox.module.scss';

export type CheckboxProps = InputProps<React.InputHTMLAttributes<HTMLInputElement>> & {
  label?: React.ReactNode;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size, error, label, className, style, required, ...props }, ref) => (
    <label
      data-input="checkbox"
      data-required={required}
      className={cn(styles.checkbox, className)}
      style={{ ...style, ...cssProps({ size }) }}
    >
      <Input {...props} ref={ref} type="checkbox" size={size} error={error} />
      {label && <div className={styles.label}>{label}</div>}
    </label>
  ),
);
