import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import { BaseInputProps } from './Input';
import { ValidationTooltip } from './ValidationTooltip';

import styles from './styles/input.module.scss';

export type SelectProps = BaseInputProps<React.SelectHTMLAttributes<HTMLSelectElement>>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ size, error, className, style, ...props }, ref) => (
    <ValidationTooltip content={error}>
      <select
        {...props}
        ref={ref}
        data-select
        data-invalid={error ? true : undefined}
        className={cn(styles.select, className)}
        style={{ ...style, ...cssProps({ size }) }}
      />
    </ValidationTooltip>
  ),
);
