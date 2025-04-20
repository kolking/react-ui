import { default as React } from 'react';
import { BaseInputProps } from './Input';
export type SelectProps = BaseInputProps<React.SelectHTMLAttributes<HTMLSelectElement>>;
export declare const Select: React.ForwardRefExoticComponent<Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
} & React.RefAttributes<HTMLSelectElement>>;
