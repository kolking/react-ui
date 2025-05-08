import { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Flex,
  palette,
  PaletteColor,
  useDialog,
} from '@lib';

import { DialogForm } from './DialogForm';
import { DeleteDialog } from './DeleteDialog';
import styles from './styles.module.scss';

export const Dialogs = () => {
  const [colors, setColors] = useState(Object.keys(palette) as PaletteColor[]);

  const dialog = useDialog({
    onCancel: () => console.log('Dialog cancelled'),
    onConfirm: () => console.log('Dialog confirmed'),
  });

  const deleteColor = useCallback((color: string) => {
    setColors((state) => state.filter((c) => c !== color));
  }, []);

  return (
    <Flex as="form">
      <Button type="button" title="Open dialog" onClick={dialog.show} />
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
        <Button type="button" title="Form dialog" />
      </DialogForm>
      <DeleteDialog size="xs" onConfirm={(color) => console.log(`${color} color deleted`)}>
        {(dialog) => (
          <Flex gap="xs" wrap="wrap">
            {colors.map((color) => (
              <Button
                key={color}
                type="button"
                variant="tertiary"
                className={styles.swatch}
                style={{ backgroundColor: palette[color][500] }}
                onClick={() => dialog.show({ color, colors, deleteColor })}
              />
            ))}
          </Flex>
        )}
      </DeleteDialog>
    </Flex>
  );
};
