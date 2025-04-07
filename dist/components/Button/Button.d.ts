import { default as React } from 'react';
import { PolymorphicProps } from '../../utils/helpers';
export type ButtonProps<T extends React.ElementType = 'button'> = PolymorphicProps<T, {
    as?: T;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'secondary' | 'tertiary';
    scheme?: 'default' | 'negative' | 'positive' | 'warning';
    minWidth?: React.CSSProperties['minWidth'];
    maxWidth?: React.CSSProperties['maxWidth'];
    busy?: boolean;
    title?: React.ReactNode;
    icon?: React.ReactElement;
    iconPosition?: 'start' | 'end';
}>;
export declare const Button: <T extends React.ElementType = "button">(props: {
    as?: T | undefined;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "tertiary";
    scheme?: "default" | "negative" | "positive" | "warning";
    minWidth?: React.CSSProperties["minWidth"];
    maxWidth?: React.CSSProperties["maxWidth"];
    busy?: boolean;
    title?: React.ReactNode;
    icon?: React.ReactElement;
    iconPosition?: "start" | "end";
} & Omit<React.PropsWithoutRef<React.ComponentProps<T>>, "title" | "size" | "as" | "icon" | "minWidth" | "maxWidth" | "variant" | "scheme" | "busy" | "iconPosition"> & React.RefAttributes<unknown>) => React.ReactElement | null;
