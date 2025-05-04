import { Field, Flex, Input, Range } from '@lib';
import React, { useCallback, useState } from 'react';

const ticks = ['low', '25%', '50%', '75%', 'full'];

export const Ranges = () => {
  const [value, setValue] = useState(35);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.currentTarget.value));
  }, []);

  const rangeError = value > 50 ? 'Must be 50 or less' : undefined;

  return (
    <Flex direction="column" gap="xl">
      <Flex>
        <Range size="md" />
        <Range step="5" min={30} max={70} defaultValue={60} />
        <Range defaultValue={70} disabled />
      </Flex>
      <Flex>
        <Field label="Controlled range" labelAccessory={`${value}%`}>
          <Range
            height="1.75em"
            value={value}
            ticks={ticks}
            error={rangeError}
            onChange={handleChange}
          >
            {value}
          </Range>
        </Field>
        <Field maxWidth={80}>
          <Input type="number" step={10} value={value} onChange={handleChange} />
        </Field>
      </Flex>
    </Flex>
  );
};
