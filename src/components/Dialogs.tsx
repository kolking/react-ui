import { useCallback, useState } from 'react';
import { Button, Dialog, DialogContent, DialogFooter, DialogTitle, Flex, useDialog } from '@lib';

import { palette } from './Palette';
import { DialogForm } from './DialogForm';
import { DeleteDialog } from './DeleteDialog';
import styles from './styles.module.scss';

export const Dialogs = () => {
  const [colors, setColors] = useState(palette.colors);

  const dialog = useDialog({
    onCancel: () => console.log('Dialog cancelled'),
    onConfirm: () => console.log('Dialog confirmed'),
  });

  const deleteColor = useCallback((index?: number) => {
    if (index !== undefined) {
      setColors((state) => state.filter((v, i) => i !== index));
    }
  }, []);

  return (
    <Flex>
      <Button title="Open dialog" onClick={dialog.show} />
      <Dialog {...dialog.props}>
        <DialogTitle>The Dialog element</DialogTitle>
        <DialogContent>
          <p>
            The HTML dialog element is used to create both modal and non-modal dialog boxes. Modal
            dialog boxes interrupt interaction with the rest of the page being inert, while
            non-modal dialog boxes allow interaction with the rest of the page.
          </p>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="secondary" title="Dismiss" onClick={dialog.cancel} />
          <Button type="button" title="OK" onClick={dialog.confirm} />
        </DialogFooter>
      </Dialog>
      <DialogForm>
        <Button title="Form dialog" />
      </DialogForm>
      <DeleteDialog width="xs" onConfirm={deleteColor}>
        {(dialog) => (
          <Flex gap="xs" wrap="wrap">
            {colors.map((color, index) => (
              <Button
                key={index}
                type="button"
                variant="tertiary"
                onClick={() => dialog.show({ index, colors })}
              >
                <div
                  className={styles.swatch}
                  style={{ backgroundColor: `var(--color-${color}-500)` }}
                />
              </Button>
            ))}
          </Flex>
        )}
      </DeleteDialog>
    </Flex>
  );
};
