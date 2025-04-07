export type SegmentedProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    items: React.ReactNode[];
    selected: number;
    disabled?: boolean;
    margin?: React.CSSProperties['margin'];
    onSelect: (index: number) => void;
};
export declare const Segmented: ({ size, items, selected, disabled, margin, className, style, onSelect, ...props }: SegmentedProps) => import("react/jsx-runtime").JSX.Element;
