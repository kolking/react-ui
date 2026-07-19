import { render, screen } from '@testing-library/react';

import { Stepper } from './Stepper';
import { StepperItem } from './StepperItem';
import styles from './styles.module.scss';

describe('Stepper', () => {
  const renderStepper = (props: Partial<React.ComponentProps<typeof Stepper>> = {}) =>
    render(
      <Stepper {...props}>
        <StepperItem>First step</StepperItem>
        <StepperItem>Second step</StepperItem>
        <StepperItem>Third step</StepperItem>
      </Stepper>,
    );

  it('renders items with indexes and separators', () => {
    const { container } = renderStepper();

    const items = container.querySelectorAll('[data-stepper-item]');
    const separators = container.querySelectorAll('[data-stepper-separator]');

    expect(items).toHaveLength(3);
    expect(Array.from(items, (item) => item.getAttribute('data-stepper-item'))).toEqual([
      '0',
      '1',
      '2',
    ]);
    expect(separators).toHaveLength(2);
  });

  it('marks items before the active step as completed', () => {
    const { container } = renderStepper({ activeStep: 1 });
    const items = container.querySelectorAll('[data-stepper-item]');

    expect(items[0]).toHaveAttribute('data-stepper-active', 'false');
    expect(items[0]).toHaveAttribute('data-stepper-completed', 'true');
    expect(items[1]).toHaveAttribute('data-stepper-active', 'true');
    expect(items[1]).toHaveAttribute('data-stepper-completed', 'false');
    expect(items[2]).toHaveAttribute('data-stepper-active', 'false');
    expect(items[2]).toHaveAttribute('data-stepper-completed', 'false');
  });

  it('uses the first step as active by default', () => {
    const { container } = renderStepper();
    const items = container.querySelectorAll('[data-stepper-item]');

    expect(items[0]).toHaveAttribute('data-stepper-active', 'true');
    expect(items[0]).toHaveAttribute('data-stepper-completed', 'false');
  });

  it.each([
    { props: {}, className: styles['horizontal-block'] },
    { props: { labelPlacement: 'inline' as const }, className: styles['horizontal-inline'] },
    {
      props: { labelPlacement: 'responsive' as const },
      className: styles['horizontal-responsive'],
    },
    { props: { variant: 'vertical' as const }, className: styles.vertical },
  ])('applies the expected layout class', ({ props, className }) => {
    const { container } = renderStepper(props);
    const root = container.querySelector('[data-stepper]');

    expect(root).toHaveClass(styles.stepper, className);
  });

  it('applies css props and merges inline styles', () => {
    const { container } = renderStepper({
      size: 'lg',
      breakpoint: 800,
      style: { color: 'red' },
    });
    const root = container.querySelector('[data-stepper]') as HTMLElement;

    expect(root.style.getPropertyValue('--size')).toBe('var(--size-lg)');
    expect(root.style.getPropertyValue('--breakpoint')).toBe('800px');
    expect(root.style.color).toBe('red');
  });

  it('forwards html attributes and applies a custom className', () => {
    render(
      <Stepper data-testid="stepper" aria-label="Checkout progress" className="custom-class">
        <StepperItem>First step</StepperItem>
        <StepperItem>Second step</StepperItem>
      </Stepper>,
    );

    const root = screen.getByTestId('stepper');
    expect(root).toHaveAttribute('aria-label', 'Checkout progress');
    expect(root).toHaveClass(styles.stepper, 'custom-class');
  });
});
