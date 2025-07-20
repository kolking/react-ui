import React from 'react';

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function cssPropValue(name: string, value?: string | number) {
  if (typeof value === 'number') {
    return `${value}px`;
  } else if (typeof value === 'string') {
    // Not using lookbehind in the beginning because iOS Safari prior to 16.4
    // does not support it. Lookahead used in the end is supported everywhere.
    return value.replace(/(^|\s)([1-4]?xs|sm|md|lg|[1-4]?xl)(?=$|\s)/g, `$1var(--${name}-$2)`);
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
  if (typeof node === 'string' || typeof node === 'number') {
    return <Wrapper>{node}</Wrapper>;
  }

  return node;
}

export function getElementRef(element: React.JSX.Element) {
  if (parseInt(React.version, 10) >= 19 && element.props.ref) {
    return element.props.ref as React.Ref<Element>;
  } else if ('ref' in element) {
    return element.ref as React.Ref<Element>;
  }

  return null;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An error occurred';
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
