import { default as React } from 'react';
import { InputProps } from './Input';
export type SelectProps = InputProps<React.SelectHTMLAttributes<HTMLSelectElement>>;
export declare const Select: React.ForwardRefExoticComponent<Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
    indeterminate?: boolean;
} & React.RefAttributes<HTMLSelectElement>>;
