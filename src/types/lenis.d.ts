declare module '@studio-freight/lenis' {
  interface LenisOptions {
    lerp?: number;
    duration?: number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    infinite?: boolean;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
  }

  interface ScrollToOptions {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    easing?: (t: number) => number;
  }

  class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    scrollTo(target: string | Element | number, options?: ScrollToOptions): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
    destroy(): void;
  }

  export default Lenis;
}
