import { FocusTrap, FocusTrapProps } from 'focus-trap-react';

const focusTrapOptions: FocusTrapProps['focusTrapOptions'] = {
  escapeDeactivates: false,
  checkCanFocusTrap: async (elements) => {
    await Promise.all(
      elements.map((element) => {
        return new Promise<void>((resolve) => {
          const interval = setInterval(() => {
            if (getComputedStyle(element).visibility !== 'hidden') {
              resolve();
              clearInterval(interval);
            }
          }, 5);
        });
      }),
    );
  },
};

export const DialogFocusTrap = (props: FocusTrapProps) => (
  <FocusTrap {...props} focusTrapOptions={focusTrapOptions} />
);
