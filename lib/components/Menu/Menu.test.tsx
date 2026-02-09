import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

vi.mock('@floating-ui/react', async () => {
  const actual = await vi.importActual('@floating-ui/react');
  return {
    ...actual,
    useListItem: () => ({ ref: vi.fn(), index: 0 }),
  };
});

describe('Menu', () => {
  it('clones trigger and toggles menu on mousedown', async () => {
    render(
      <Menu trigger={<button>Open</button>}>
        <MenuItem title="One" />
      </Menu>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('data-menu-trigger');

    fireEvent.mouseDown(trigger); // click to open

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeInTheDocument();
    });

    fireEvent.mouseDown(trigger); // click to close

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('renders menu even when closed if unmount=false', () => {
    render(
      <Menu unmount={false} trigger={<button>Open</button>}>
        <div>content</div>
      </Menu>,
    );

    expect(screen.queryByRole('menu')).toBeInTheDocument();
  });

  it('applies size as CSS variable', async () => {
    render(
      <Menu size="md" trigger={<button>Open</button>}>
        <div>content</div>
      </Menu>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.mouseDown(trigger);

    await waitFor(() => {
      const menu = screen.queryByRole('menu');
      expect(menu).not.toBeNull();
      expect(menu?.style.getPropertyValue('--size')).toContain('var(--size-md)');
    });
  });

  it('renders inside closest data-floating-root', async () => {
    render(
      <section data-floating-root>
        <div data-floating-root>
          <Menu trigger={<button>Open</button>}>
            <div>content</div>
          </Menu>
        </div>
      </section>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.mouseDown(trigger);

    await waitFor(() => {
      const floatingRoot = screen.getByRole('menu').closest('[data-floating-root]')!;
      expect(floatingRoot.tagName).toBe('DIV');
    });
  });

  it('calls onSelect when MenuItem child is clicked', async () => {
    const onSelect = vi.fn();
    render(
      <Menu trigger={<button>Open</button>} onSelect={onSelect}>
        <MenuItem title="Item" />
      </Menu>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.mouseDown(trigger);

    const item = await screen.findByRole('menuitem');
    fireEvent.click(item);

    expect(onSelect).toHaveBeenCalledWith(0); // useListItem mock returns index 0
  });
});
