import cn from 'classnames';
import React, { useEffect, useImperativeHandle, useRef } from 'react';

import { cssProps } from '../../utils/helpers';
import { Input, BaseInputProps } from './Input';
import styles from './styles/checkbox.module.scss';

export type CheckboxProps = BaseInputProps & {
  label?: React.ReactNode;
  indeterminate?: boolean;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size, error, label, className, style, required, indeterminate, ...props }, ref) => {
    const checked = props.checked;
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    useEffect(() => {
      if (indeterminate != null && innerRef.current != null) {
        innerRef.current.indeterminate = !checked && indeterminate;
      }
    }, [innerRef, indeterminate, checked]);

    return (
      <label
        data-checkbox
        data-required={required}
        className={cn(styles.checkbox, className)}
        style={{ ...style, ...cssProps({ size }) }}
      >
        <Input {...props} ref={innerRef} type="checkbox" size={size} error={error} />
        {label && (
          <div data-checkbox-label className={styles.label}>
            {label}
          </div>
        )}
      </label>
    );
  },
);
