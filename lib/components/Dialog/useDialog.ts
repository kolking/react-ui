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

  const show = useCallback((values: T) => {
    setData(values);
    setOpen(true);
    refOptions.current?.onShow?.(values);
  }, []);

  const close = useCallback(
    (result?: R) => {
      if (disabled) {
        return;
      }

      setOpen((open) => {
        if (open) {
          ref.current?.addEventListener('transitionend', function callback(e: TransitionEvent) {
            // Skip transitionend from child elements
            if (e.target === ref.current) {
              if (result !== undefined) {
                refOptions.current?.onConfirm?.(result);
              } else {
                refOptions.current?.onCancel?.();
              }

              setData(undefined);
              this.removeEventListener('transitionend', callback);
            }
          });
        }

        return false;
      });
    },
    [disabled],
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

    if (dialog) {
      // Hide when clicked outside
      function handleClick(e: MouseEvent) {
        if (e.target === e.currentTarget) {
          close();
        }
      }

      // Hide when escape pressed
      function handleEscape(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          e.stopPropagation();
          e.preventDefault();
          close();
        }
      }

      dialog.addEventListener('click', handleClick);
      dialog.addEventListener('keydown', handleEscape);

      return () => {
        dialog.removeEventListener('click', handleClick);
        dialog.removeEventListener('keydown', handleEscape);
      };
    }
  }, [close]);

  return {
    props: { ref, open },
    data,
    disabled,
    show,
    disable: setDisabled,
    cancel: useCallback(() => close(), [close]),
    confirm: useCallback((values: R) => close(values), [close]),
  };
}
