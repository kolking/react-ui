import { Button, ButtonGroup, Flex, Icon, ToggleButton, ToggleGroup, Tooltip } from '@lib';
import { useState } from 'react';

export const Buttons = () => {
  const [toggleButton, setToggleButton] = useState(false);

  return (
    <Flex as="section" direction="column" gap="xl">
      <Flex wrap="wrap">
        <Tooltip content="This is a tooltip">
          <Button title="Primary" minWidth={110} />
        </Tooltip>
        <Button title="Disabled" disabled />
        <Button title="Loading" busy />
        <Button icon={<Icon name="gear" />} />
        <Button title="Negative" scheme="negative" icon={<Icon name="error-circle" />} />
        <Button title="Positive" scheme="positive" icon={<Icon name="checkmark-circle" />} />
        <Button title="Warning" scheme="warning" icon={<Icon name="warning" />} />
      </Flex>
      <Flex wrap="wrap">
        <Button variant="secondary" title="Secondary" minWidth={110} />
        <Button variant="secondary" title="Disabled" disabled />
        <Button variant="secondary" title="Loading" busy />
        <Button variant="secondary" icon={<Icon name="gear" />} />
        <Button
          variant="secondary"
          title="Negative"
          scheme="negative"
          icon={<Icon name="error-circle" />}
        />
        <Button
          variant="secondary"
          title="Positive"
          scheme="positive"
          icon={<Icon name="checkmark-circle" />}
        />
        <Button
          variant="secondary"
          title="Warning"
          scheme="warning"
          icon={<Icon name="warning" />}
        />
      </Flex>
      <Flex wrap="wrap" gap="xl">
        <Button variant="tertiary" title="Tertiary" />
        <Button variant="tertiary" title="Disabled" disabled />
        <Button variant="tertiary" title="Loading" busy />
        <Button variant="tertiary" icon={<Icon name="gear" />} />
        <Button
          variant="tertiary"
          title="Negative"
          scheme="negative"
          icon={<Icon name="error-circle" />}
        />
        <Button
          variant="tertiary"
          title="Positive"
          scheme="positive"
          icon={<Icon name="checkmark-circle" />}
        />
        <Button
          variant="tertiary"
          title="Warning"
          scheme="warning"
          icon={<Icon name="warning" />}
        />
      </Flex>
      <Flex wrap="wrap">
        <Button
          as="a"
          title="Link button"
          href="https://google.com"
          iconPosition="end"
          icon={<Icon name="arrow-right" />}
        />
        <Button
          as="a"
          title="Link button"
          href="https://google.com"
          iconPosition="end"
          icon={<Icon name="arrow-right" />}
        />
        <Button
          as="a"
          variant="secondary"
          title="Link button"
          href="https://google.com"
          iconPosition="end"
          icon={<Icon name="arrow-right" />}
        />
        <Button
          as="a"
          variant="tertiary"
          title="Link button"
          href="https://google.com"
          iconPosition="end"
          icon={<Icon name="arrow-right" />}
        />
      </Flex>
      <Flex wrap="wrap">
        <Button title="Size XS" size="xs" />
        <Button title="Size SM" size="sm" />
        <Button title="Size MD" size="md" />
        <Button title="Size LG" size="lg" />
        <Button title="Size XL" size="xl" />
        <Button title="Max width button" maxWidth={135} />
        <Button title="Min width" minWidth={135} />
      </Flex>
      <Flex wrap="wrap">
        <Button variant="secondary" title="Size XS" size="xs" />
        <Button variant="secondary" title="Size SM" size="sm" />
        <Button variant="secondary" title="Size MD" size="md" />
        <Button variant="secondary" title="Size LG" size="lg" />
        <Button variant="secondary" title="Size XL" size="xl" />
        <Button variant="secondary" title="Max width button" maxWidth={135} />
        <Button variant="secondary" title="Min width" minWidth={135} />
      </Flex>
      <Flex wrap="wrap">
        <ToggleButton
          title="Toggle me"
          selected={toggleButton}
          onClick={() => setToggleButton(!toggleButton)}
        />
        <ToggleButton
          title="Toggle me"
          scheme="positive"
          selected={toggleButton}
          onClick={() => setToggleButton(!toggleButton)}
        />
        <ToggleButton
          title="Toggle me"
          scheme="negative"
          selected={toggleButton}
          onClick={() => setToggleButton(!toggleButton)}
        />
        <ToggleGroup>
          {['First', 'Second', 'Third'].map((title) => (
            <ToggleButton
              key={title}
              title={title}
              onClick={() => console.log('ToggleGroup:', title)}
            />
          ))}
        </ToggleGroup>
        <ButtonGroup>
          {['First', 'Second', 'Third'].map((title) => (
            <Button key={title} type="button" title={title} variant="secondary" />
          ))}
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
