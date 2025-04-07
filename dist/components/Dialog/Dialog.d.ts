import { default as React } from 'react';
import { ButtonProps } from '../Button';
export type DialogProps = React.HTMLProps<HTMLDialogElement> & {
    width?: React.CSSProperties['width'];
};
export declare const Dialog: React.ForwardRefExoticComponent<Omit<DialogProps, "ref"> & React.RefAttributes<HTMLDialogElement>>;
export declare const DialogTitle: ({ className, children, ...props }: React.HTMLProps<HTMLHeadingElement>) => import("react/jsx-runtime").JSX.Element;
export declare const DialogContent: ({ className, children, ...props }: React.HTMLProps<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
export declare const DialogFooter: ({ className, children, ...props }: React.HTMLProps<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
export declare const DialogClose: ({ className, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
