import { default as React } from 'react';
export declare function clamp(value: number, min: number, max: number): number;
export declare const pluralize: (number: number, one: string, many: string, includeNumber?: boolean) => string;
export declare function cssProps(values: {
    [key: string]: number | string | undefined;
}): React.CSSProperties;
export declare function wrapNode(node: React.ReactNode, Wrapper: React.ElementType): number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
export type PolymorphicProps<T extends React.ElementType, P = Record<string, never>> = P & Omit<React.ComponentPropsWithoutRef<T>, keyof P>;
export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];
type FixedForwardRef = <T, P = Record<string, never>>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;
export declare const fixedForwardRef: FixedForwardRef;
export declare function getErrorMessage(error: unknown): string;
export {};
