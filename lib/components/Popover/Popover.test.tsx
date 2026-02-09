import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover } from './Popover';

describe('Popover', () => {
  it('opens and closes on click by default', async () => {
    const user = userEvent.setup();

    render(
      <Popover trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Content')).toBeInTheDocument();

    await user.click(screen.getByText('Open'));
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('respects controlled open prop', () => {
    const onToggle = vi.fn();

    const { rerender } = render(
      <Popover open={false} onToggle={onToggle} trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    rerender(
      <Popover open={true} onToggle={onToggle} trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onToggle when opened', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <Popover onToggle={onToggle} trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    await user.click(screen.getByText('Open'));
    expect(onToggle).toHaveBeenCalledWith(true, expect.any(PointerEvent), 'click');
  });

  it('does not render popover when disabled', async () => {
    const user = userEvent.setup();

    render(
      <Popover disabled trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    await user.click(screen.getByText('Open'));
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('opens on hover when event includes hover', async () => {
    const user = userEvent.setup();

    render(
      <Popover event="hover" trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    await user.hover(screen.getByText('Open'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders popover with dialog role and data attribute', async () => {
    const user = userEvent.setup();

    render(
      <Popover trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    await user.click(screen.getByText('Open'));
    const dialog = screen.getByRole('dialog');
    expect(dialog.dataset.popover).toBe('bottom');
  });

  it('renders portal inside closest data-floating-root', async () => {
    const user = userEvent.setup();

    render(
      <section data-floating-root>
        <div data-floating-root>
          <Popover trigger={<button>Open</button>}>
            <div>Content</div>
          </Popover>
        </div>
      </section>,
    );

    await user.click(screen.getByText('Open'));
    const floatingRoot = screen.getByText('Content').closest('[data-floating-root]')!;
    expect(floatingRoot.tagName).toBe('DIV');
  });

  it('uses anchor element as position reference', async () => {
    const user = userEvent.setup();
    const anchor = document.createElement('a');

    render(
      <Popover anchor={anchor} trigger={<button>Open</button>}>
        <div>Content</div>
      </Popover>,
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
