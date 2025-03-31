import cn from 'classnames';
import React from 'react';

import { cssProps } from '../../utils/helpers';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import styles from './styles/field.module.scss';

export interface FieldConfig {
  id?: string;
  label?: React.ReactNode;
  help?: React.ReactNode;
  tooltip?: React.ReactNode;
  required?: boolean;
  className?: string;
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
}

export type FieldProps = React.HTMLAttributes<HTMLDivElement> & FieldConfig;

export const Field = ({
  id,
  label,
  help,
  tooltip,
  required,
  minWidth,
  maxWidth,
  className,
  children,
  ...props
}: FieldProps) => (
  <div
    {...props}
    data-field={id || true}
    className={cn(styles.field, className)}
    style={{ ...props.style, ...cssProps({ minWidth, maxWidth }) }}
  >
    {label && (
      <div className={styles.header}>
        <label htmlFor={id} data-required={required || undefined} className={styles.label}>
          {label}
        </label>
        {tooltip && (
          <Tooltip content={tooltip} placement="top-end">
            <Icon name="help-circle" tabIndex={0} />
          </Tooltip>
        )}
      </div>
    )}
    {children}
    {help && <small className={styles.help}>{help}</small>}
  </div>
);
