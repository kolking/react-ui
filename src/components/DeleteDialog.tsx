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
  index: number;
  colors: string[];
};

type DialogProps = WithDialogProps<Props, number>;

const Dialog = ({ dialog, index, colors }: DialogProps) => {
  const [selected, setSelected] = useState(index);

  useEffect(() => setSelected(index), [index]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(parseInt(e.target.value));
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
          {colors.map((color, colorIndex) => (
            <option key={colorIndex} value={colorIndex}>
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

export const DeleteDialog = withDialog<Props, number>(Dialog);
