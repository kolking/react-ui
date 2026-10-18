import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows tooltip on hover and hides on unhover', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');

    await user.hover(trigger);
    expect(screen.getByText('Hello')).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );

    await user.tab();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('does not render tooltip when disabled', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip disabled content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText('Trigger'));
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('renders tooltip with proper role and data attribute', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Hello" placement="bottom">
        <button>Trigger</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText('Trigger'));
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.dataset.tooltip).toBe('bottom');
  });

  it('renders tooltip inside closest data-floating-root', async () => {
    const user = userEvent.setup();

    render(
      <section data-floating-root>
        <div data-floating-root>
          <Tooltip content="Hello">
            <button>Trigger</button>
          </Tooltip>
        </div>
      </section>,
    );

    await user.hover(screen.getByText('Trigger'));
    const floatingRoot = screen.getByText('Hello').closest('[data-floating-root]')!;
    expect(floatingRoot.tagName).toBe('DIV');
  });

  it('uses anchor element as position reference', async () => {
    const user = userEvent.setup();
    const anchor = document.createElement('a');

    render(
      <Tooltip anchor={anchor} content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText('Trigger'));
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('returns to the trigger when anchor is removed', async () => {
    const user = userEvent.setup();
    const anchor = document.createElement('a');
    const anchorRect = new DOMRect(100, 100, 20, 20);
    const triggerRect = new DOMRect(10, 10, 20, 20);
    vi.spyOn(anchor, 'getBoundingClientRect').mockReturnValue(anchorRect);

    const { rerender } = render(
      <Tooltip anchor={anchor} content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );

    vi.spyOn(screen.getByText('Trigger'), 'getBoundingClientRect').mockReturnValue(triggerRect);
    await user.hover(screen.getByText('Trigger'));

    const tooltip = screen.getByRole('tooltip');
    await waitFor(() => expect(tooltip.style.transform).toBe('translate(5px, 92px)'));

    rerender(
      <Tooltip anchor={null} content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );

    await waitFor(() => expect(tooltip.style.transform).toBe('translate(5px, 2px)'));
  });

  it('renders arrow when tooltip is open (smoke test for arrow middleware)', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip placement="top-start" content="Hello">
        <button>Trigger</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText('Trigger'));
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
