import cn from 'classnames';
import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

import { cssProps } from '../../utils/helpers';
import { BaseInputProps } from './Input';
import { ValidationTooltip } from './ValidationTooltip';
import styles from './styles/input.module.scss';

type Style = React.CSSProperties & {
  height?: number;
};

export type TextareaProps = BaseInputProps<TextareaAutosizeProps> & {
  autosize?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ autosize = true, size, error, className, style, ...rest }, ref) => {
    const Component = autosize ? TextareaAutosize : 'textarea';
    const props = autosize ? { minRows: 2, ...rest } : rest;

    return (
      <ValidationTooltip content={error}>
        <Component
          {...props}
          ref={ref}
          data-textarea
          data-autosize={autosize}
          data-invalid={error ? true : undefined}
          className={cn(styles.textarea, className)}
          style={{ ...style, ...cssProps({ size }) } as Style}
        />
      </ValidationTooltip>
    );
  },
);
