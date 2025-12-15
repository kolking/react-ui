import { useState } from 'react';
import {
  Button,
  Checkbox,
  Field,
  Flex,
  Icon,
  Input,
  Numeric,
  Radio,
  Select,
  Textarea,
  Tooltip,
} from '@lib';

import styles from './styles.module.scss';

export const Form = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex as="form" direction="column" gap="xl" className={styles.form}>
      <Flex>
        <Field
          label="Text label"
          required
          labelAccessory={
            <Tooltip content="This is a tooltip" placement="top-end">
              <Icon aria-label="Field help" name="help-circle" scheme="neutral" tabIndex={0} />
            </Tooltip>
          }
        >
          <Input placeholder="Placeholder" />
        </Field>
        <Field
          label="Text label"
          required
          labelAccessory={<Button type="button" title="Action" variant="tertiary" size="sm" />}
        >
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
          <Input
            type="search"
            defaultValue="Keyword"
            prefix={<Icon name="search" />}
            error="This is an error"
          >
            <Button type="button" title="GO" variant="tertiary" />
          </Input>
        </Field>
        <Field label="Number" maxWidth={100}>
          <Input type="number" step={1} prefix="$" />
        </Field>
        <Field label="Numeric" maxWidth={150}>
          <Numeric step={1} prefix="Qty:" />
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
        <Field label="Website">
          <Input type="url" defaultValue="domain.com" prefix="https://">
            <Button type="button" variant="tertiary" icon={<Icon name="arrow-right-circle" />} />
          </Input>
        </Field>
        <Field label="Username">
          <Input type="text" placeholder="Search" prefix={<Icon name="profile" scheme="neutral" />}>
            <Icon name="checkmark-circle" scheme="success" />
          </Input>
        </Field>
        <Field label="Password">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            prefix={<Icon name="key" scheme="neutral" />}
          >
            <Button
              type="button"
              variant="tertiary"
              icon={<Icon name={showPassword ? 'eye-off' : 'eye'} scheme="neutral" />}
              onClick={() => setShowPassword(!showPassword)}
            />
          </Input>
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
        <Field label="Textarea" help="This is a help text shown below the field">
          <Textarea autosize={false} placeholder="Write something..." />
        </Field>
      </Flex>
      <Flex gap="lg">
        <Input type="checkbox" size="xl" />
        <Checkbox label="Checkbox" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Disabled" defaultChecked disabled />
        <Checkbox label="Invalid" error="This field is not valid" />
        <Checkbox label="Indeterminate" indeterminate />
      </Flex>
      <Flex gap="lg">
        <Input type="radio" size="xl" />
        <Radio name="choice" label="Radio" />
        <Radio name="choice" label="Checked" defaultChecked />
        <Radio label="Disabled" defaultChecked disabled />
        <Radio name="choice" label="Invalid" error="This field is not valid" />
        <Checkbox label={<a href="#">Link label</a>} />
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
};
