import { default as React } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { BaseInputProps } from './Input';
export type TextareaProps = BaseInputProps<TextareaAutosizeProps> & {
    autosize?: boolean;
};
export declare const Textarea: React.ForwardRefExoticComponent<Omit<TextareaAutosizeProps, "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    error?: string;
} & {
    autosize?: boolean;
} & React.RefAttributes<HTMLTextAreaElement>>;
