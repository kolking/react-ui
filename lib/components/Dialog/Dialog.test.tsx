import { render, screen, fireEvent } from '@testing-library/react';

import { Dialog, DialogTitle, DialogContent, DialogFooter, DialogClose } from './Dialog';

describe('Dialog', () => {
  it('renders dialog with title, content, footer and sets aria-labelledby', () => {
    const requestClose = vi.fn();
    const setTriggerProps = vi.fn();

    render(
      <div data-floating-root>
        <Dialog open={true} requestClose={requestClose} setTriggerProps={setTriggerProps}>
          <DialogTitle>My Dialog</DialogTitle>
          <DialogContent>Body text</DialogContent>
          <DialogFooter>Footer</DialogFooter>
          <DialogClose />
        </Dialog>
      </div>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const title = screen.getByText('My Dialog');
    expect(title).toHaveAttribute('id');
    expect(dialog).toHaveAttribute('aria-labelledby', title.getAttribute('id'));

    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'close dialog' }));
    expect(requestClose).toHaveBeenCalled();

    expect(setTriggerProps).toHaveBeenCalled();
  });

  it('does not render when open is false', () => {
    const requestClose = vi.fn();
    render(
      <Dialog open={false} requestClose={requestClose}>
        <DialogContent>Hidden</DialogContent>
      </Dialog>,
    );

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders inside closest data-floating-root when present', () => {
    render(
      <section data-floating-root>
        <div data-floating-root>
          <Dialog open={true} requestClose={vi.fn()}>
            <DialogContent />
          </Dialog>
        </div>
      </section>,
    );

    const overlay = document.querySelector('[data-dialog-overlay]')!;
    const floatingRoot = overlay.closest('[data-floating-root]')!;
    expect(floatingRoot.tagName).toBe('DIV');
  });
});
