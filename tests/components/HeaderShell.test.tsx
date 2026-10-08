import { act, cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HeaderShell } from '../../src/components/header/HeaderShell';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const property = '--measured-header-h';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.documentElement.style.removeProperty(property);
});

describe('header sticky offset measurement', () => {
  it('publishes fractional initial and resized heights, then restores the prior inline value', () => {
    let height = 117;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () => ({ height }) as DOMRect,
    );
    let notify: ResizeObserverCallback | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: ResizeObserverCallback) { notify = callback; }
      observe = observe;
      disconnect = disconnect;
    });
    document.documentElement.style.setProperty(property, '96px', 'important');
    const { container, unmount } = render(<HeaderShell><div>Ticker</div></HeaderShell>);
    expect(document.documentElement.style.getPropertyValue(property)).toBe('117px');
    expect(observe).toHaveBeenCalledWith(container.querySelector('header'), { box: 'border-box' });
    height = 100.5;
    act(() => notify?.([], {} as ResizeObserver));
    expect(document.documentElement.style.getPropertyValue(property)).toBe('100.5px');
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(document.documentElement.style.getPropertyValue(property)).toBe('96px');
    expect(document.documentElement.style.getPropertyPriority(property)).toBe('important');
  });

  it('falls back to resize events without ResizeObserver and removes its property on unmount', () => {
    let height = 117;
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () => ({ height }) as DOMRect,
    );
    vi.stubGlobal('ResizeObserver', undefined);
    const { unmount } = render(<HeaderShell><div>Ticker</div></HeaderShell>);
    expect(document.documentElement.style.getPropertyValue(property)).toBe('117px');
    height = 100.5;
    act(() => window.dispatchEvent(new Event('resize')));
    expect(document.documentElement.style.getPropertyValue(property)).toBe('100.5px');
    unmount();
    expect(document.documentElement.style.getPropertyValue(property)).toBe('');
    act(() => window.dispatchEvent(new Event('resize')));
    expect(document.documentElement.style.getPropertyValue(property)).toBe('');
  });
});
