import { default as React } from 'react';
import { InputProps } from './Input';
export type RadioProps = InputProps<React.InputHTMLAttributes<HTMLInputElement>> & {
    label?: React.ReactNode;
};
export declare const Radio: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
    indeterminate?: boolean;
} & {
    label?: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>>;
