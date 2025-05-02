import cn from 'classnames';
import React, { useCallback, useImperativeHandle, useRef } from 'react';

import { Icon } from '../Icon';
import { Button } from '../Button';
import { Input, InputProps } from './Input';

import styles from './styles/numeric.module.scss';

export type NumericProps = Omit<InputProps, 'children'>;

export const Numeric = React.forwardRef<HTMLInputElement, NumericProps>(
  ({ className, ...props }, ref) => {
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
      <Input
        {...props}
        ref={innerRef}
        type="number"
        wrapperType="numeric"
        className={cn(styles.numeric, className)}
      >
        <Button
          type="button"
          variant="secondary"
          aria-label="Increase"
          disabled={props.disabled}
          className={styles.increase}
          icon={<Icon name="triangle-up" />}
          onClick={handleStepUp}
        />
        <Button
          type="button"
          variant="secondary"
          aria-label="Decrease"
          disabled={props.disabled}
          className={styles.decrease}
          icon={<Icon name="triangle-down" />}
          onClick={handleStepDown}
        />
      </Input>
    );
  },
);
