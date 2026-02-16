import { useCallback, useRef, useState } from 'react';
import { afterTransition } from '../../utils/helpers';

type DialogShowOptions<R> = {
  onConfirm?: (values: R) => void;
  onCancel?: () => void;
};

export type DialogOptions<T, R> = DialogShowOptions<R> & {
  defaultOpen?: boolean;
  onShow?: (values: T) => void;
};

export type DialogType<T, R> = ReturnType<typeof useDialog<T, R>>;

export function useDialog<T, R>(options?: DialogOptions<T, R>) {
  const ref = useRef<HTMLDivElement>(null);
  const refDisabled = useRef(false);
  const refOptions = useRef(options);
  const refShowOptions = useRef<DialogShowOptions<R>>(undefined);
  const [triggerProps, setTriggerProps] = useState<Record<string, unknown>>({});
  const [open, setOpen] = useState(options?.defaultOpen ?? false);
  const [data, setData] = useState<T>();

  refOptions.current = options;

  const show = useCallback((values: T, showOptions: DialogShowOptions<R> = {}) => {
    if (refDisabled.current) {
      return;
    }

    refShowOptions.current = showOptions;

    setOpen(true);
    setData(values);
    refOptions.current?.onShow?.(values);
  }, []);

  const close = useCallback((result?: R) => {
    if (refDisabled.current) {
      return;
    }

    refDisabled.current = true;
    ref.current?.setAttribute('data-open', 'false');

    afterTransition(ref.current, () => {
      if (result !== undefined) {
        refOptions.current?.onConfirm?.(result);
        refShowOptions.current?.onConfirm?.(result);
      } else {
        refOptions.current?.onCancel?.();
        refShowOptions.current?.onCancel?.();
      }

      setOpen(false);
      setData(undefined);
      refDisabled.current = false;
    });
  }, []);

  const cancel = useCallback(() => close(), [close]);

  const confirm = useCallback((values: R) => close(values), [close]);

  const preventClose = useCallback(async <T>(promise: Promise<T>) => {
    refDisabled.current = true;

    try {
      return await promise;
    } finally {
      refDisabled.current = false;
    }
  }, []);

  return {
    props: { ref, open, setTriggerProps, requestClose: cancel },
    triggerProps,
    /**
     * @deprecated The property will be removed in the next major release
     */
    trigger: { ...triggerProps, onClick: show },
    data,
    show,
    cancel,
    confirm,
    preventClose,
  };
}
