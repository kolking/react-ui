import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import { ValidationTooltip } from './ValidationTooltip';

import checkboxStyles from './styles/checkbox.module.scss';
import inputStyles from './styles/input.module.scss';

function getClassName(type: React.HTMLInputTypeAttribute) {
  switch (type) {
    case 'checkbox':
    case 'radio':
      return checkboxStyles.input;
    case 'date':
    case 'datetime':
    case 'datetime-local':
    case 'month':
    case 'week':
      return inputStyles.date;
    case 'time':
    case 'number':
    case 'search':
    case 'range':
    case 'hidden':
    case 'button':
    case 'submit':
    case 'reset':
    case 'image':
    case 'file':
      return inputStyles[type];
    default:
      return inputStyles.input;
  }
}

export type BaseInputProps<T = React.InputHTMLAttributes<HTMLInputElement>> = Omit<T, 'size'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ size, error, type = 'text', className, style, ...props }, ref) => {
    if (['button', 'reset', 'submit', 'image'].includes(type)) {
      console.warn(`Input type "${type}" is not supported, use <Button>`);
    }

    return (
      <ValidationTooltip content={error}>
        <input
          {...props}
          ref={ref}
          type={type}
          data-input={type}
          data-invalid={error ? true : undefined}
          className={cn(getClassName(type), className)}
          style={{ ...style, ...cssProps({ size }) }}
        />
      </ValidationTooltip>
    );
  },
);
