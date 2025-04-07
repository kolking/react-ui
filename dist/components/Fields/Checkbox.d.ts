import { default as React } from 'react';
import { InputProps } from './Input';
export type CheckboxProps = InputProps<React.InputHTMLAttributes<HTMLInputElement>> & {
    label?: React.ReactNode;
};
export declare const Checkbox: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
    indeterminate?: boolean;
} & {
    label?: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>>;
