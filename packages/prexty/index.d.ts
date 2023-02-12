export interface ReactLoaderConfig {
  indexHTML?: string;
}
export interface Options {
  lang?: Plugin[];
}

export function react(config?: ReactLoaderConfig): Plugin;
export function prexty(options?: Options): Plugin;
