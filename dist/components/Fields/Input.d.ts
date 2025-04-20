import { default as React } from 'react';
export type BaseInputProps<T = React.InputHTMLAttributes<HTMLInputElement>> = Omit<T, 'size'> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    error?: string;
};
export declare const Input: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
} & React.RefAttributes<HTMLInputElement>>;
