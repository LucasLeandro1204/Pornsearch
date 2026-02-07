import { OverwriteError } from './OverwriteError';

type Constructor<T = {}> = new (...args: any[]) => T;

export default function VideoMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    videoUrl(): string {
      throw new OverwriteError();
    }

    videoParser(): any[] {
      throw new OverwriteError();
    }
  };
}
