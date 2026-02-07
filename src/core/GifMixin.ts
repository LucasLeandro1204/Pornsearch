import { OverwriteError } from './OverwriteError';

type Constructor<T = {}> = new (...args: any[]) => T;

export default function GifMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    gifUrl(): string {
      throw new OverwriteError();
    }

    gifParser(): any[] {
      throw new OverwriteError();
    }
  };
}
