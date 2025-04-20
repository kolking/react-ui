import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import { ValidationTooltip } from './ValidationTooltip';

import checkboxStyles from './styles/checkbox.module.scss';
import inputStyles from './styles/input.module.scss';

function allowWrap(type: React.HTMLInputTypeAttribute) {
  return ![
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit',
  ].includes(type);
}

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
    case 'color':
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

export type InputProps = Omit<BaseInputProps, 'prefix'> & {
  prefix?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size, error, type = 'text', className, style, prefix, children, ...props }, ref) => {
    const content =
      allowWrap(type) && (prefix || children) ? (
        <div
          data-input-wrapper
          data-disabled={props.disabled}
          data-invalid={error ? true : undefined}
          className={cn(inputStyles.wrapper, className)}
          style={{ ...style, ...cssProps({ size }) }}
        >
          {prefix && (
            <div data-input-prefix className={inputStyles.wrapper_prefix}>
              {prefix}
            </div>
          )}
          <input
            {...props}
            ref={ref}
            type={type}
            data-input={type}
            className={getClassName(type)}
          />
          {children && (
            <div data-input-accessory className={inputStyles.wrapper_accessory}>
              {children}
            </div>
          )}
        </div>
      ) : (
        <input
          {...props}
          ref={ref}
          type={type}
          data-input={type}
          data-invalid={error ? true : undefined}
          className={cn(getClassName(type), className)}
          style={{ ...style, ...cssProps({ size }) }}
        />
      );

    return <ValidationTooltip content={error}>{content}</ValidationTooltip>;
  },
);
