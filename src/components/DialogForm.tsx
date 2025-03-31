import React, { useCallback, useState } from 'react';
import {
  Button,
  ButtonProps,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Field,
  Flex,
  Input,
  useDialog,
} from '@lib';

const initialData = {
  name: '',
  email: '',
};

function validate(data: typeof initialData) {
  const errors = {
    name: !data.name ? 'Your name is required' : '',
    email: !data.email ? 'Your email is required' : '',
  };
  const valid = !errors.name && !errors.email;
  return { valid, errors };
}

type Props = {
  children: React.ReactElement<ButtonProps>;
};

export const DialogForm = ({ children }: Props) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const dialog = useDialog({
    onConfirm: (result) => {
      setData(initialData);
      setErrors(initialData);
      console.log('SUBMITTED', result);
    },
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setData((state) => ({ ...state, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const { valid, errors } = validate(data);
    if (valid) {
      dialog.disable(true);
      setTimeout(() => {
        dialog.disable(false);
        dialog.confirm(data);
      }, 5000);
    } else {
      setErrors(errors);
    }
  }, [data, dialog]);

  return (
    <>
      {React.cloneElement(children, { onClick: dialog.show })}
      <Dialog {...dialog.props}>
        <DialogTitle>Form dialog</DialogTitle>
        <DialogContent>
          <p>Please enter your name and your email address in the form below.</p>
          <Flex as="form" direction="column" noValidate>
            <Field label="Your name" required>
              <Input
                type="text"
                name="name"
                disabled={dialog.disabled}
                value={data.name}
                error={errors.name}
                onChange={handleChange}
              />
            </Field>
            <Field label="Your email" required>
              <Input
                type="email"
                name="email"
                disabled={dialog.disabled}
                value={data.email}
                error={errors.email}
                onChange={handleChange}
              />
            </Field>
          </Flex>
        </DialogContent>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            title="Dismiss"
            disabled={dialog.disabled}
            onClick={dialog.cancel}
          />
          <Button type="button" title="Submit" busy={dialog.disabled} onClick={handleSubmit} />
        </DialogFooter>
        <DialogClose disabled={dialog.disabled} onClick={dialog.cancel} />
      </Dialog>
    </>
  );
};
