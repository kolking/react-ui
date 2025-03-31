import { useState } from 'react';
import { Segmented } from '@lib';

export const SegmentedList = () => {
  const [segmented, setSegmented] = useState(0);

  return (
    <>
      <Segmented
        size="xs"
        items={['First', 'Second', 'Third', 'Fourth', 'Fifth']}
        selected={segmented}
        onSelect={setSegmented}
      />
      <Segmented
        size="sm"
        items={['First', 'Second', 'Third', 'Fourth', 'Fifth']}
        selected={segmented}
        onSelect={setSegmented}
      />
      <Segmented
        items={['First', 'Second', 'Third', 'Fourth', 'Fifth']}
        selected={segmented}
        onSelect={setSegmented}
      />
      <Segmented
        size="lg"
        items={['First', 'Second', 'Third', 'Fourth', 'Fifth']}
        selected={segmented}
        onSelect={setSegmented}
      />
      <Segmented
        size="xl"
        items={['First', 'Second', 'Third', 'Fourth', 'Fifth']}
        selected={segmented}
        onSelect={setSegmented}
      />
    </>
  );
};
