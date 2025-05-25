import { useCallback, useState } from 'react';
import { Button, Flex, Heading, Icon, Input, Popover } from '@lib';

export const PopoverDemo = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue(e.currentTarget['popover-text'].value);
    setOpen(false);
  }, []);

  return (
    <Flex>
      <Popover maxWidth="20em" trigger={<Button type="button" title="Popover" />}>
        <Heading as="h6" title="Hey there 👋" />
        <div>
          This is a test message, please keep calm and do nothing, everything is under control by
          the authorities.
        </div>
      </Popover>
      <Popover
        open={open}
        modal={true}
        placement="bottom-start"
        trigger={
          <div>
            <Input
              value={value}
              readOnly={true}
              placeholder="Modal popover"
              style={{ maxWidth: 200 }}
            >
              <Button type="button" variant="tertiary" icon={<Icon name="frame" />} />
            </Input>
          </div>
        }
        onToggle={setOpen}
      >
        <Flex as="form" onSubmit={handleSubmit}>
          <Input name="popover-text" placeholder="Type something..." />
          <Button type="submit" title="OK" />
        </Flex>
      </Popover>
    </Flex>
  );
};
