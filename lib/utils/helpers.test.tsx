import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  clamp,
  cssProps,
  afterTransition,
  wrapNode,
  getElementRef,
  getErrorMessage,
  htmlImage,
} from './helpers';

describe('clamp', () => {
  it('clamps value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('cssProps', () => {
  it('converts numbers to px', () => {
    const style = cssProps({ size: 10 });
    expect(style['--size']).toBe('10px');
  });

  it('converts size tokens to css vars', () => {
    const style = cssProps({ size: 'md', margin: 'lg sm' });
    expect(style['--size']).toBe('var(--size-md)');
    expect(style['--margin']).toBe('var(--margin-lg) var(--margin-sm)');
  });

  it('ignores undefined values', () => {
    const style = cssProps({ size: undefined });
    expect(style).toEqual({});
  });

  it('converts camelCase keys to kebab-case', () => {
    const style = cssProps({ backgroundColor: 'red' });
    expect(style['--background-color']).toBe('red');
  });
});

describe('afterTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('calls callback after max transition duration', () => {
    const element = document.createElement('div');

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionDuration: '0.1s, 0.3s',
    } as CSSStyleDeclaration);

    const callback = vi.fn();
    afterTransition(element, callback);

    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });

  it('calls callback immediately when element is null', () => {
    const callback = vi.fn();
    afterTransition(null, callback);

    vi.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('wrapNode', () => {
  it('wraps string node', () => {
    const result = wrapNode('test', 'span');
    const { container } = render(<>{result}</>);
    expect(container.querySelector('span')).toHaveTextContent('test');
  });

  it('wraps number node', () => {
    const result = wrapNode(42, 'div');
    const { container } = render(<>{result}</>);
    expect(container.querySelector('div')).toHaveTextContent('42');
  });

  it('returns element as is', () => {
    const node = <strong>text</strong>;
    const result = wrapNode(node, 'span');
    expect(result).toBe(node);
  });
});

describe('getElementRef', () => {
  it('returns ref from element.props.ref in React 19+', () => {
    const ref = React.createRef<HTMLDivElement>();
    const element = <div ref={ref} />;
    const result = getElementRef(element);
    expect(result).toBe(ref);
  });

  it('returns null when element has no ref', () => {
    const element = <div />;
    const result = getElementRef(element);
    expect(result).toBeNull();
  });
});

describe('getErrorMessage', () => {
  it('returns error message from Error', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('returns string error', () => {
    expect(getErrorMessage('fail')).toBe('fail');
  });

  it('returns default message for unknown error', () => {
    expect(getErrorMessage({})).toBe('An error occurred');
  });
});

describe('htmlImage', () => {
  it('renders img with decoding async', () => {
    render(htmlImage({ src: 'test.png', alt: 'test' }));

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('decoding', 'async');
    expect(img).toHaveAttribute('src', 'test.png');
    expect(img).toHaveAttribute('alt', 'test');
  });
});
