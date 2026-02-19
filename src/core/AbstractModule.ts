import { Constructor, Mixin } from '../types';

/**
 * Abstract base class for all module implementations
 * Provides core functionality and mixin support for extending capabilities
 */
export abstract class AbstractModule {
  query: string;

  constructor(query: string = '') {
    this.query = query;
  }

  /**
   * The name of the module (e.g., 'Pornhub', 'Sex')
   */
  abstract get name(): string;

  /**
   * The first page number for this module (usually 0 or 1)
   */
  abstract get firstpage(): number;

  /**
   * Applies mixins to the base class to extend its functionality
   * @param mixins - One or more mixin functions to apply
   * @returns A new class with all mixin functionality applied
   * @example
   * ```typescript
   * class MyModule extends AbstractModule.with(VideoMixin, GifMixin) {
   *   // Implementation
   * }
   * ```
   */
  static with<A>(m1: Mixin<A>): Constructor<A> & typeof AbstractModule;
  static with<A, B>(m1: Mixin<A>, m2: Mixin<B>): Constructor<A & B> & typeof AbstractModule;
  static with<A, B, C>(
    m1: Mixin<A>,
    m2: Mixin<B>,
    m3: Mixin<C>,
  ): Constructor<A & B & C> & typeof AbstractModule;
  static with(...mixins: Mixin[]): typeof AbstractModule {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let baseClass: any = this;
    for (const mixin of mixins) {
      baseClass = mixin(baseClass);
    }
    return baseClass;
  }
}

export default AbstractModule;
