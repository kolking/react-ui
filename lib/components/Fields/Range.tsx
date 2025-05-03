import cn from 'classnames';
import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import { BaseInputProps } from './Input';
import { ValidationTooltip } from './ValidationTooltip';
import { cssProps } from '../../utils/helpers';

import styles from './styles/range.module.scss';

function setProgress(input: HTMLInputElement) {
  const min = parseFloat(input.min) || 0;
  const max = parseFloat(input.max) || 100;
  const value = parseFloat(input.value);
  const progress = ((value - min) / (max - min)) * 100;

  console.log(min, max, value, `${progress}%`);

  input.style.setProperty('--progress', `${progress}%`);
}

export type RangeProps = BaseInputProps;

export const Range = React.forwardRef<HTMLInputElement, RangeProps>(
  ({ size, error, value, className, style, onChange, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    useEffect(() => {
      if (innerRef.current) {
        setProgress(innerRef.current);
      }
    }, [value]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(e.currentTarget);
        onChange?.(e);
      },
      [onChange],
    );

    return (
      <ValidationTooltip content={error}>
        <input
          {...props}
          ref={innerRef}
          value={value}
          type="range"
          data-input="range"
          data-invalid={error ? true : undefined}
          className={cn(styles.range, className)}
          style={{ ...style, ...cssProps({ size }) }}
          onChange={handleChange}
        />
      </ValidationTooltip>
    );
  },
);
