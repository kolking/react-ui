import { default as React } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { InputProps } from './Input';
export type TextareaProps = InputProps<TextareaAutosizeProps> & {
    autosize?: boolean;
};
export declare const Textarea: React.ForwardRefExoticComponent<Omit<TextareaAutosizeProps, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
    indeterminate?: boolean;
} & {
    autosize?: boolean;
} & React.RefAttributes<HTMLTextAreaElement>>;
