import { default as React } from 'react';
import { BaseInputProps } from './Input';
export type QuantityProps = BaseInputProps;
export declare const Quantity: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
} & React.RefAttributes<HTMLInputElement>>;
