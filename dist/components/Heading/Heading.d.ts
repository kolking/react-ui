import { default as React } from 'react';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'title'> & {
    as?: HeadingElement;
    size?: HeadingElement;
    title: React.ReactNode;
    margin?: React.CSSProperties['margin'];
    marginStart?: React.CSSProperties['marginBlockStart'];
    marginEnd?: React.CSSProperties['marginBlockEnd'];
};
export declare const Heading: ({ as: Element, size, title, margin, marginStart, marginEnd, className, children, style, ...props }: HeadingProps) => import("react/jsx-runtime").JSX.Element;
export {};
