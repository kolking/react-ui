import { default as React } from 'react';
import { BaseInputProps } from './Input';
export type RadioProps = BaseInputProps & {
    label?: React.ReactNode;
};
export declare const Radio: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
} & {
    label?: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>>;
