import { default as React } from 'react';
import { DialogProps } from './Dialog';
import { DialogOptions, DialogType } from './useDialog';
type ComponentProps<T, R> = Omit<DialogProps, 'children'> & DialogOptions<T, R> & {
    children: (dialog: DialogType<T, R>) => React.ReactNode;
};
export type WithDialogProps<T extends object, R> = T & {
    dialog: DialogType<T, R>;
};
export declare function withDialog<T extends object, R>(Component: React.ComponentType<WithDialogProps<T, R>>): React.ComponentType<ComponentProps<T, R>>;
export {};
