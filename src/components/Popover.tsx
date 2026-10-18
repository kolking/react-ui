import { useCallback, useRef, useState } from 'react';
import { Button, Flex, Heading, Icon, Input, Popover } from '@lib';

type SelectionAnchor = {
  getBoundingClientRect: () => DOMRect;
  getClientRects: () => DOMRectList;
  contextElement: Element;
  selectedText: string;
};

function SelectableText() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [anchor, setAnchor] = useState<SelectionAnchor | null>(null);

  const showForSelection = () => {
    const paragraph = paragraphRef.current;
    const selection = window.getSelection();

    if (!paragraph || !selection || selection.isCollapsed || !selection.rangeCount) {
      setAnchor(null);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!paragraph.contains(range.commonAncestorContainer)) {
      setAnchor(null);
      return;
    }

    // Save selection after focus moved into the popover
    const selectedRange = range.cloneRange();

    setAnchor({
      getBoundingClientRect: () => selectedRange.getBoundingClientRect(),
      getClientRects: () => selectedRange.getClientRects(),
      contextElement: paragraph,
      selectedText: selectedRange.toString(),
    });
  };

  return (
    <>
      <p
        ref={paragraphRef}
        onMouseUp={showForSelection}
        onKeyUp={showForSelection}
        onTouchEnd={showForSelection}
      >
        Select a portion of this text using mouse or keyboard.
      </p>
      {anchor && (
        <Popover
          open
          anchor={anchor}
          placement="bottom"
          onToggle={(open) => {
            if (!open) setAnchor(null);
          }}
        >
          You selected: <em>{anchor.selectedText}</em>
        </Popover>
      )}
    </>
  );
}

export const PopoverDemo = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
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
      <SelectableText />
    </Flex>
  );
};
