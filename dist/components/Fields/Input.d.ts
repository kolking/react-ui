import { default as React } from 'react';
export type InputProps<T = React.InputHTMLAttributes<HTMLInputElement>> = Omit<T, 'size'> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    error?: string;
    indeterminate?: boolean;
};
export declare const Input: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
    indeterminate?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
