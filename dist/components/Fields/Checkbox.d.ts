import { default as React } from 'react';
import { BaseInputProps } from './Input';
export type CheckboxProps = BaseInputProps & {
    label?: React.ReactNode;
    indeterminate?: boolean;
};
export declare const Checkbox: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
} & {
    label?: React.ReactNode;
    indeterminate?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
