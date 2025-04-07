import { default as React } from 'react';
export type QuantityProps<T = React.InputHTMLAttributes<HTMLInputElement>> = Omit<T, 'size'> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    error?: string;
};
export declare const Quantity: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
} & React.RefAttributes<HTMLInputElement>>;
