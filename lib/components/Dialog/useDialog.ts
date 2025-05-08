import { useCallback, useRef, useState } from 'react';

function afterTransition(element: Element | null, callback: () => void) {
  setTimeout(
    callback,
    element ? parseFloat(getComputedStyle(element).transitionDuration) * 1000 : 0,
  );
}

export type DialogOptions<T, R> = {
  defaultOpen?: boolean;
  onShow?: (values: T) => void;
  onConfirm?: (result: R) => void;
  onCancel?: () => void;
};

export type DialogType<T, R> = ReturnType<typeof useDialog<T, R>>;

export function useDialog<T, R>(options?: DialogOptions<T, R>) {
  const ref = useRef<HTMLDivElement>(null);
  const refOptions = useRef(options);
  const refDisabled = useRef(false);
  const [open, setOpen] = useState(options?.defaultOpen ?? false);
  const [data, setData] = useState<T>();

  refOptions.current = options;

  const show = useCallback((values: T) => {
    if (refDisabled.current) {
      return;
    }

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
      } else {
        refOptions.current?.onCancel?.();
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
    props: { ref, open, requestClose: cancel },
    data,
    show,
    cancel,
    confirm,
    preventClose,
  };
}
