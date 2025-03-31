import { useObjectRef } from '@react-aria/utils';
import cn from 'classnames';
import React, { useEffect } from 'react';

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
      return inputStyles[type];
    default:
      return inputStyles.input;
  }
}

export type InputProps<T = React.InputHTMLAttributes<HTMLInputElement>> = Omit<T, 'size'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  error?: string;
  indeterminate?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size, error, type = 'text', className, style, indeterminate, ...props }, ref) => {
    const domRef = useObjectRef(ref);
    const checked = props.checked;

    useEffect(() => {
      if (indeterminate != null && domRef.current != null) {
        domRef.current.indeterminate = !checked && indeterminate;
      }
    }, [domRef, indeterminate, checked]);

    if (['button', 'reset', 'submit'].includes(type)) {
      console.warn(`Input type "${type}" is not supported, use <Button>`);
    }

    return (
      <ValidationTooltip content={error}>
        <input
          {...props}
          ref={domRef}
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
