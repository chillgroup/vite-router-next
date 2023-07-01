export interface Options {
  /**
   * Resolves to the `root` value from Vite config.
   * @default config.root
   */
  root: string
  /**
   * Paths to the directory to search for page components.
   * @default 'src/pages'
   */
  dir: string
}

export const resolveOptions = (root: string, options?: Options): Options => {
  return {
    root: options?.root ?? root,
    dir: options?.dir ?? 'src/pages',
  }
}
