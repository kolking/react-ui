import {
  Checkbox,
  Field,
  Flex,
  Icon,
  Input,
  Quantity,
  Radio,
  Select,
  Textarea,
  Tooltip,
} from '@lib';

export const Form = () => (
  <Flex as="form" direction="column" gap="xl">
    <Flex>
      <Field
        label="Text label"
        required
        labelAccessory={
          <Tooltip content="This is a tooltip" placement="top-end">
            <Icon name="help-circle" size="1em" color="var(--color-gray-400)" tabIndex={0} />
          </Tooltip>
        }
      >
        <Input placeholder="Placeholder" />
      </Field>
      <Field label="Text label" required>
        <Input defaultValue="Read only" readOnly />
      </Field>
      <Field label="Text label" required>
        <Input defaultValue="Disabled" disabled />
      </Field>
      <Field label="Text label" required>
        <Input defaultValue="Invalid value" error="Wrong value entered" />
      </Field>
    </Flex>
    <Flex>
      <Input size="xs" placeholder="Size XS" />
      <Input size="sm" placeholder="Size SM" />
      <Input size="md" placeholder="Size MD" />
      <Input size="lg" placeholder="Size LG" />
      <Input size="xl" placeholder="Size XL" />
    </Flex>
    <Flex>
      <Field label="Search">
        <Input type="search" defaultValue="Search" />
      </Field>
      <Field label="Numeric" maxWidth={100}>
        <Input type="number" step={10} />
      </Field>
      <Field label="Quantity" maxWidth={100}>
        <Quantity type="number" step={10} />
      </Field>
      <Field label="Select">
        <Select>
          <option>one</option>
          <option>two</option>
          <option>three</option>
        </Select>
      </Field>
    </Flex>
    <Flex>
      <Field label="Date" minWidth={125}>
        <Input type="date" />
      </Field>
      <Field label="Datetime" minWidth={170}>
        <Input type="datetime-local" />
      </Field>
      <Field label="Time" minWidth={80}>
        <Input type="time" />
      </Field>
      <Field label="Month" minWidth={150}>
        <Input type="month" />
      </Field>
      <Field label="Week" minWidth={160}>
        <Input type="week" />
      </Field>
    </Flex>
    <Flex>
      <Field label="Textarea" help="This is a help text shown below the field">
        <Textarea placeholder="Write something..." />
      </Field>
    </Flex>
    <Flex gap="lg">
      <Input type="checkbox" />
      <Checkbox label="Checkbox" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" defaultChecked disabled />
      <Checkbox label="Invalid" error="This field is not valid" />
    </Flex>
    <Flex gap="lg">
      <Input type="radio" size="xl" />
      <Radio name="choice" label="Radio" />
      <Radio name="choice" label="Checked" defaultChecked />
      <Radio label="Disabled" defaultChecked disabled />
      <Radio name="choice" label="Invalid" error="This field is not valid" />
    </Flex>
    <Flex gap="lg">
      <Checkbox label="Size XS" size="xs" defaultChecked />
      <Checkbox label="Size SM" size="sm" defaultChecked />
      <Checkbox label="Size MD" size="md" defaultChecked />
      <Checkbox label="Size LG" size="lg" defaultChecked />
      <Checkbox label="Size XL" size="xl" defaultChecked />
    </Flex>
    <Flex gap="lg">
      <Radio label="Size XS" size="xs" defaultChecked />
      <Radio label="Size SM" size="sm" defaultChecked />
      <Radio label="Size MD" size="md" defaultChecked />
      <Radio label="Size LG" size="lg" defaultChecked />
      <Radio label="Size XL" size="xl" defaultChecked />
    </Flex>
  </Flex>
);
