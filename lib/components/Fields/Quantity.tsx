import cn from 'classnames';
import React, { useCallback, useImperativeHandle, useRef } from 'react';

import { cssProps } from '../../utils/helpers';
import { ValidationTooltip } from './ValidationTooltip';

import SvgDecrease from '../../assets/fields/quantity-decrease.svg?react';
import SvgIncrease from '../../assets/fields/quantity-increase.svg?react';

import styles from './styles/quantity.module.scss';

export type QuantityProps<T = React.InputHTMLAttributes<HTMLInputElement>> = Omit<T, 'size'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  error?: string;
};

export const Quantity = React.forwardRef<HTMLInputElement, QuantityProps>(
  ({ size, error, className, style, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    const handleStepUp = useCallback(() => {
      innerRef.current?.stepUp();
      innerRef.current?.dispatchEvent(new Event('change', { bubbles: true }));
    }, []);

    const handleStepDown = useCallback(() => {
      innerRef.current?.stepDown();
      innerRef.current?.dispatchEvent(new Event('change', { bubbles: true }));
    }, []);

    return (
      <ValidationTooltip content={error}>
        <div
          data-input="quantity"
          data-disabled={props.disabled ? true : undefined}
          data-invalid={error ? true : undefined}
          className={cn(styles.quantity, className)}
          style={{ ...style, ...cssProps({ size }) }}
        >
          <input {...props} ref={innerRef} type="number" />
          <button
            type="button"
            aria-label="Increase"
            disabled={props.disabled}
            className={styles.increase}
            onClick={handleStepUp}
          >
            <SvgIncrease aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Decrease"
            disabled={props.disabled}
            className={styles.decrease}
            onClick={handleStepDown}
          >
            <SvgDecrease aria-hidden />
          </button>
        </div>
      </ValidationTooltip>
    );
  },
);
