import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import { Input, BaseInputProps } from './Input';
import styles from './styles/checkbox.module.scss';

export type RadioProps = BaseInputProps & {
  label?: React.ReactNode;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ size, error, label, className, style, required, ...props }, ref) => (
    <label
      data-input="radio"
      data-required={required}
      className={cn(styles.radio, className)}
      style={{ ...style, ...cssProps({ size }) }}
    >
      <Input {...props} ref={ref} type="radio" size={size} error={error} />
      {label && <div className={styles.label}>{label}</div>}
    </label>
  ),
);
