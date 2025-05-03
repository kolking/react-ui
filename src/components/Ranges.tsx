import { Field, Flex, Input, Range } from '@lib';
import React, { useCallback, useState } from 'react';

export const Ranges = () => {
  const [value, setValue] = useState(35);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.currentTarget.value));
  }, []);

  const rangeError = value > 50 ? 'This is an error message' : undefined;

  return (
    <Flex direction="column" gap="xl">
      <Flex>
        <Range size="md" />
        <Range value={value} error={rangeError} onChange={handleChange} />
        <Field maxWidth={80}>
          <Input type="number" step={10} value={value} error={rangeError} onChange={handleChange} />
        </Field>
      </Flex>
      <Flex>
        <Range disabled />
        <Range min={30} max={70} defaultValue={35} />
      </Flex>
    </Flex>
  );
};
