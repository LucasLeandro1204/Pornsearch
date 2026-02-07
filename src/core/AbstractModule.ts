import { OverwriteError } from './OverwriteError';

type Constructor<T = any> = new (...args: any[]) => T;
type Mixin<T = any> = (base: Constructor) => Constructor<T>;

export abstract class AbstractModule {
  query: string;

  constructor(query: string = '') {
    this.query = query;
  }

  abstract get name(): string;

  abstract get firstpage(): number;

  static with(...mixins: Mixin[]): typeof AbstractModule {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let baseClass: any = this;
    for (const mixin of mixins) {
      baseClass = mixin(baseClass);
    }
    return baseClass;
  }
}

export default AbstractModule;
