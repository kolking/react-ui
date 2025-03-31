import { useCallback, useEffect, useRef, useState } from 'react';

export type DialogOptions<T, R> = {
  defaultOpen?: boolean;
  onShow?: (values: T) => void;
  onConfirm?: (result: R) => void;
  onCancel?: () => void;
};

export type DialogType<T, R> = ReturnType<typeof useDialog<T, R>>;

export function useDialog<T, R>(options?: DialogOptions<T, R>) {
  const ref = useRef<HTMLDialogElement>(null);
  const refOptions = useRef(options);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(options?.defaultOpen ?? false);
  const [data, setData] = useState<T>();

  refOptions.current = options;

  const handleShow = useCallback((values: T) => {
    setData(values);
    setOpen(true);
    refOptions.current?.onShow?.(values);
  }, []);

  const handleHide = useCallback(
    (result?: R) => {
      if (open) {
        setOpen(false);
        ref.current?.addEventListener(
          'transitionend',
          () => {
            if (result !== undefined) {
              refOptions.current?.onConfirm?.(result);
            } else {
              refOptions.current?.onCancel?.();
            }
            setData(undefined);
          },
          { once: true },
        );
      }
    },
    [open],
  );

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;

    // Hide when clicked outside
    function handleClick(e: MouseEvent) {
      if (e.target === e.currentTarget && !disabled) {
        handleHide();
      }
    }

    // Disable closing via escape if disabled
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && disabled) {
        e.preventDefault();
      }
    }

    function handleCancel() {
      handleHide();
    }

    if (dialog) {
      dialog.addEventListener('click', handleClick);
      dialog.addEventListener('cancel', handleCancel);
      dialog.addEventListener('keydown', handleEscape);

      return () => {
        dialog.removeEventListener('click', handleClick);
        dialog.removeEventListener('cancel', handleCancel);
        dialog.removeEventListener('keydown', handleEscape);
      };
    }
  }, [disabled, handleHide]);

  return {
    props: { ref, open },
    data,
    disabled,
    show: handleShow,
    disable: setDisabled,
    confirm: useCallback((values: R) => handleHide(values), [handleHide]),
    cancel: useCallback(() => handleHide(), [handleHide]),
  };
}
