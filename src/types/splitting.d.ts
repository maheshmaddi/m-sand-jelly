declare module 'splitting' {
  interface SplittingResult {
    el: HTMLElement;
    chars: HTMLElement[];
    words: HTMLElement[];
  }

  interface SplittingOptions {
    target?: Element | Element[] | string;
    by?: string;
    key?: string;
  }

  function Splitting(options?: SplittingOptions): SplittingResult[];
  export default Splitting;
}

declare module 'splitting/dist/splitting.css' {
  const content: string;
  export default content;
}

declare module 'splitting/dist/splitting-cells.css' {
  const content: string;
  export default content;
}
