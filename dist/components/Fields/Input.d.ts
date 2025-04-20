import { default as React } from 'react';
export type BaseInputProps<T = React.InputHTMLAttributes<HTMLInputElement>> = Omit<T, 'size'> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    error?: string;
};
export type InputProps = Omit<BaseInputProps, 'prefix'> & {
    prefix?: React.ReactNode;
};
export declare const Input: React.ForwardRefExoticComponent<Omit<BaseInputProps<React.InputHTMLAttributes<HTMLInputElement>>, "prefix"> & {
    prefix?: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>>;
