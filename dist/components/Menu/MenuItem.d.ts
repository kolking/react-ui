export type MenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    scheme?: 'default' | 'negative' | 'positive' | 'warning';
    icon?: React.ReactElement;
    title?: React.ReactNode;
};
export declare const MenuItem: ({ size, scheme, icon, title, children, className, style, onClick, ...props }: MenuItemProps) => import("react/jsx-runtime").JSX.Element;
