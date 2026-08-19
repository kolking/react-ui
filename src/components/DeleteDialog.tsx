import { useCallback, useState } from 'react';
import {
  Button,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Notice,
  Select,
  withDialog,
  WithDialogProps,
} from '@lib';

type Props = {
  color: string;
  colors: string[];
  deleteColor: (color: string) => void;
};

type DialogProps = WithDialogProps<Props, string>;

const Dialog = ({ dialog, color, colors, deleteColor }: DialogProps) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      const selected = new FormData(e.currentTarget).get('color');

      if (typeof selected !== 'string') {
        return;
      }

      setBusy(true);

      await dialog.preventClose<void>(
        new Promise((resolve, reject) =>
          setTimeout(() => {
            setBusy(false);

            if (selected === 'red') {
              setError('Failed to delete red color');
              reject();
            } else {
              deleteColor(selected);
              resolve();
            }
          }, 5000),
        ),
      );

      dialog.confirm(selected);
    },
    [dialog, deleteColor],
  );

  return (
    <form onSubmit={handleDelete}>
      <DialogTitle>Delete color</DialogTitle>
      <DialogContent>
        {error && <Notice error={error} variant="plain" />}
        <p>Select a color to delete:</p>
        <Select name="color" defaultValue={color}>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
      </DialogContent>
      <DialogFooter>
        <Button
          type="button"
          title="Dismiss"
          variant="secondary"
          disabled={busy}
          onClick={dialog.cancel}
        />
        <Button type="submit" title="Delete" scheme="negative" busy={busy} />
      </DialogFooter>
      <DialogClose disabled={busy} />
    </form>
  );
};

export const DeleteDialog = withDialog<Props, string>(Dialog, { size: 'xs' });
