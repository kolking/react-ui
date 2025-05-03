import React from 'react';
import cn from 'classnames';

import { BaseInputProps } from './Input';
import { cssProps } from '../../utils/helpers';

import styles from './styles/switch.module.scss';
import { ValidationTooltip } from './ValidationTooltip';

export type SwitchProps = BaseInputProps & {
  label?: React.ReactNode;
  checkedColor?: string;
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ size, error, label, required, checkedColor, className, style, ...props }, ref) => {
    return (
      <label
        data-input="switch"
        data-required={required}
        className={cn(styles.switch, className)}
        style={{ ...style, ...cssProps({ size, checkedColor }) }}
      >
        <ValidationTooltip content={error}>
          <input
            {...props}
            ref={ref}
            type="checkbox"
            data-invalid={error ? true : undefined}
            className={styles.input}
          />
        </ValidationTooltip>
        {label && <div className={styles.label}>{label}</div>}
      </label>
    );
  },
);
