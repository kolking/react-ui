import { Flex, Heading, Icon, Stepper, StepperItem } from '@lib';

export const StepperDemo = () => (
  <Flex direction="column" gap="xl">
    <Stepper size="md" activeStep={2} labelPlacement="responsive" breakpoint={800}>
      <StepperItem as="a" href="https://domain.com" icon={<Icon name="arrow-left" />}>
        Step one
      </StepperItem>
      <StepperItem>Step two</StepperItem>
      <StepperItem>Step three</StepperItem>
      <StepperItem>Step four</StepperItem>
      <StepperItem>Step five</StepperItem>
    </Stepper>
    <Stepper size="md" activeStep={2} variant="vertical">
      <StepperItem>
        <Heading as="h6" title="Step one" marginEnd="0.25em" />
        This is the first step's description
      </StepperItem>
      <StepperItem>
        <Heading as="h6" title="Step two" marginEnd="0.25em" />
        This is the second step's description
      </StepperItem>
      <StepperItem>
        <Heading as="h6" title="Step three" marginEnd="0.25em" />
        This is the third step's description
      </StepperItem>
      <StepperItem>Step four</StepperItem>
      <StepperItem>Step five</StepperItem>
    </Stepper>
  </Flex>
);
