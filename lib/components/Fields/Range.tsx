import cn from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cssProps, wrapNode } from '../../utils/helpers';
import { BaseInputProps } from './Input';
import { ValidationTooltip } from './ValidationTooltip';
import styles from './styles/range.module.scss';

function setProgress(element: HTMLDivElement | null, min: number, max: number, value: number) {
  element?.style.setProperty('--progress', `${(value - min) / (max - min)}`);
}

type TickMarksProps = {
  ticks: number | (string | number)[];
};

const TickMarks = ({ ticks }: TickMarksProps) => {
  const list = typeof ticks === 'number' ? [...Array(ticks)] : ticks;

  if (list.length < 2) {
    return null;
  }

  return (
    <ul data-range-ticks className={styles.ticks}>
      {list.map((label, index) => (
        <li key={index}>{label !== undefined && <small>{label}</small>}</li>
      ))}
    </ul>
  );
};

export type RangeProps = Omit<BaseInputProps, 'min' | 'max' | 'value' | 'defaultValue'> & {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  ticks?: TickMarksProps['ticks'];
};

export const Range = React.forwardRef<HTMLInputElement, RangeProps>(
  ({ size, height, error, ticks, className, style, children, onChange, ...props }, ref) => {
    const { min = 0, max = 100, defaultValue = 50, value = defaultValue } = props;
    const rootRef = useRef<HTMLDivElement>(null);
    const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      setProgress(rootRef.current, min, max, value);
    }, [min, max, value]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(rootRef.current, min, max, parseFloat(e.currentTarget.value));
        onChange?.(e);
      },
      [min, max, onChange],
    );

    return (
      <div
        ref={rootRef}
        data-range
        data-disabled={props.disabled}
        data-invalid={error ? true : undefined}
        className={cn(styles.range, className)}
        style={{ ...style, ...cssProps({ size, height }) }}
      >
        <div data-range-wrapper className={styles.range_wrapper}>
          <div data-range-track className={styles.range_track} />
          <div ref={setTooltipRef} data-range-thumb className={styles.range_thumb}>
            {children !== undefined && wrapNode(children, 'small')}
          </div>
          <ValidationTooltip content={error} placement="top" anchor={tooltipRef}>
            <input {...props} ref={ref} type="range" onChange={handleChange} />
          </ValidationTooltip>
        </div>
        {ticks !== undefined && <TickMarks ticks={ticks} />}
      </div>
    );
  },
);
