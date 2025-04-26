import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Select,
  withDialog,
  WithDialogProps,
} from '@lib';

type Props = {
  color: string;
  colors: string[];
};

type DialogProps = WithDialogProps<Props, string>;

const Dialog = ({ dialog, color, colors }: DialogProps) => {
  const [selected, setSelected] = useState(color);

  useEffect(() => setSelected(color), [color]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  }, []);

  const handleDelete = useCallback(() => {
    dialog?.confirm(selected);
  }, [dialog, selected]);

  return (
    <>
      <DialogTitle>Delete color</DialogTitle>
      <DialogContent>
        <p>Select a color to delete:</p>
        <Select value={selected} onChange={handleChange}>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
      </DialogContent>
      <DialogFooter>
        <Button type="button" title="Dismiss" variant="secondary" onClick={dialog?.cancel} />
        <Button type="button" title="Delete" scheme="negative" onClick={handleDelete} />
      </DialogFooter>
    </>
  );
};

export const DeleteDialog = withDialog<Props, string>(Dialog);
