import React from 'react';
import cn from 'classnames';

import { cssProps } from '../../utils/helpers';
import { BaseInputProps } from './Input';
import { ValidationTooltip } from './ValidationTooltip';
import styles from './styles/switch.module.scss';

export type SwitchProps = BaseInputProps & {
  label?: React.ReactNode;
  checkedColor?: string;
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ size, error, label, required, checkedColor, className, style, ...props }, ref) => (
    <label
      data-switch
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
      {label && (
        <div data-switch-label className={styles.label}>
          {label}
        </div>
      )}
    </label>
  ),
);
