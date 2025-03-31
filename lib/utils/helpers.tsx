import React from 'react';

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export const pluralize = (number: number, one: string, many: string, includeNumber = true) =>
  includeNumber ? `${number}\u00A0${number === 1 ? one : many}` : `${number === 1 ? one : many}`;

function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function cssPropValue(name: string, value?: string | number) {
  if (typeof value === 'number') {
    return `${value}px`;
  } else if (typeof value === 'string') {
    return value.replace(/(?<=^|\s)([1-4]?xs|sm|md|lg|[1-4]?xl)/g, `var(--${name}-$1)`);
  }

  return value;
}

export function cssProps(values: { [key: string]: number | string | undefined }) {
  const style: React.CSSProperties = {};

  Object.keys(values).map((key) => {
    const name = toKebabCase(key);
    const value = cssPropValue(name, values[key]);

    if (value) {
      style[`--${name}`] = value;
    }
  });

  return style;
}

export function wrapNode(node: React.ReactNode, Wrapper: React.ElementType) {
  return typeof node === 'string' ? <Wrapper>{node}</Wrapper> : node;
}

// https://www.christianvm.dev/blog/react-as-prop
// https://fettblog.eu/typescript-react-generic-forward-refs/
// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
// https://github.com/total-typescript/react-typescript-tutorial/blob/main/src/08-advanced-patterns/72-as-prop-with-forward-ref.solution.tsx
// https://gist.github.com/sunpietro/0625031ed6aa0aaa429d27c25f350c50

export type PolymorphicProps<T extends React.ElementType, P = Record<string, never>> = P &
  Omit<React.ComponentPropsWithoutRef<T>, keyof P>;

export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

type FixedForwardRef = <T, P = Record<string, never>>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;

export const fixedForwardRef = React.forwardRef as FixedForwardRef;

export function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An error occurred';
}
