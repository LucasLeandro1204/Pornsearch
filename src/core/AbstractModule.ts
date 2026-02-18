/**
 * Base constructor type for mixin pattern
 */
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Mixin function type that enhances a class with additional functionality
 */
type Mixin<T = object> = (base: Constructor) => Constructor<T>;

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
  static with(...mixins: Mixin[]): typeof AbstractModule {
    let baseClass: any = this;
    for (const mixin of mixins) {
      baseClass = mixin(baseClass);
    }
    return baseClass;
  }
}

export default AbstractModule;
