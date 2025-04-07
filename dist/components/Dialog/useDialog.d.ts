export type DialogOptions<T, R> = {
    defaultOpen?: boolean;
    onShow?: (values: T) => void;
    onConfirm?: (result: R) => void;
    onCancel?: () => void;
};
export type DialogType<T, R> = ReturnType<typeof useDialog<T, R>>;
export declare function useDialog<T, R>(options?: DialogOptions<T, R>): {
    props: {
        ref: import('react').RefObject<HTMLDialogElement>;
        open: boolean;
    };
    data: T | undefined;
    disabled: boolean;
    show: (values: T) => void;
    disable: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    confirm: (values: R) => void;
    cancel: () => void;
};
