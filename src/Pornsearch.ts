import axios from 'axios';
import * as cheerio from 'cheerio';
import modules from './core/Modules';
import { ModuleInterface, Video, Gif, ContentType } from './types';

const GIF: ContentType = 'gif';
const PARSER = 'Parser';
const VIDEO: ContentType = 'video';

/**
 * Main Pornsearch class for searching adult content across multiple platforms
 * 
 * @example
 * ```typescript
 * // Create a searcher
 * const searcher = new Pornsearch('query', 'pornhub');
 * 
 * // Search for videos
 * const videos = await searcher.videos();
 * 
 * // Search for gifs
 * const gifs = await searcher.gifs(2);
 * 
 * // Change driver
 * searcher.driver('sex');
 * ```
 */
class Pornsearch {
  private module: ModuleInterface;
  private modules: typeof modules;
  private static _modulesWithVideoSupport: string[] | null = null;
  private static _modulesWithGifSupport: string[] | null = null;

  /**
   * Creates a new Pornsearch instance
   * @param query - Search query string (optional)
   * @param driver - Module name to use (default: 'pornhub')
   */
  constructor(query?: string, driver?: string) {
    this.modules = modules;
    this.module = {} as ModuleInterface;
    this.driver(driver, query);
  }

  /**
   * Get list of supported module names
   * @returns Array of supported module names (e.g., ['pornhub', 'sex', 'redtube'])
   */
  support(): string[] {
    return Object.keys(this.modules);
  }

  /**
   * Get the current active module name
   * @returns Current module name
   */
  current(): string {
    return this.module.name;
  }

  /**
   * Get the current search query
   * @returns Search query string
   */
  get query(): string {
    return this.module.query || '';
  }

  /**
   * Check if the current module supports video search
   * @returns True if video search is supported
   */
  supportsVideos(): boolean {
    return typeof this.module.videoUrl === 'function';
  }

  /**
   * Check if the current module supports GIF search
   * @returns True if GIF search is supported
   */
  supportsGifs(): boolean {
    return typeof this.module.gifUrl === 'function';
  }

  /**
   * Search for GIFs
   * @param page - Optional page number (default: first page of current module)
   * @returns Promise resolving to array of GIFs
   * @throws Error if the current module doesn't support GIF search
   * @throws Error if no search query is set
   */
  gifs(page?: number): Promise<Gif[]> {
    // Check module support first before validating query
    if (!this.module.gifUrl) {
      throw new Error(
        `GIF search is not supported for ${this.module.name}. ` +
          `Supported modules with GIF search: ${this._getModulesWithGifSupport().join(', ')}`
      );
    }
    this._validateQuery();
    return this._get(this.module.gifUrl(page), GIF, page || this.module.firstpage);
  }

  /**
   * Search for videos
   * @param page - Optional page number (default: first page of current module)
   * @returns Promise resolving to array of videos
   * @throws Error if the current module doesn't support video search
   * @throws Error if no search query is set
   */
  videos(page?: number): Promise<Video[]> {
    // Check module support first before validating query
    if (!this.module.videoUrl) {
      throw new Error(
        `Video search is not supported for ${this.module.name}. ` +
          `Supported modules with video search: ${this._getModulesWithVideoSupport().join(', ')}`
      );
    }
    this._validateQuery();
    return this._get(this.module.videoUrl(page), VIDEO, page || this.module.firstpage);
  }

  /**
   * Validates that a search query is set
   * @private
   * @throws Error if query is empty or only whitespace
   */
  private _validateQuery(): void {
    if (!this.query || this.query.trim() === '') {
      throw new Error('Search query is required. Please set a query before searching.');
    }
  }

  /**
   * Get list of modules that support GIF search (cached for performance)
   * @private
   * @returns Array of module names supporting GIF search
   */
  private _getModulesWithGifSupport(): string[] {
    if (Pornsearch._modulesWithGifSupport === null) {
      Pornsearch._modulesWithGifSupport = Object.keys(this.modules).filter((moduleName) => {
        const Module = this.modules[moduleName];
        const instance = new Module('');
        return typeof instance.gifUrl === 'function';
      });
    }
    return Pornsearch._modulesWithGifSupport;
  }

  /**
   * Get list of modules that support video search (cached for performance)
   * @private
   * @returns Array of module names supporting video search
   */
  private _getModulesWithVideoSupport(): string[] {
    if (Pornsearch._modulesWithVideoSupport === null) {
      Pornsearch._modulesWithVideoSupport = Object.keys(this.modules).filter((moduleName) => {
        const Module = this.modules[moduleName];
        const instance = new Module('');
        return typeof instance.videoUrl === 'function';
      });
    }
    return Pornsearch._modulesWithVideoSupport;
  }

  /**
   * Internal method to fetch and parse content
   * @private
   */
  private async _get<T extends Video | Gif>(
    url: string,
    type: ContentType,
    page: number
  ): Promise<T[]> {
    try {
      const { data: body } = await axios.get(url);
      const $ = cheerio.load(body);
      const parserMethod = `${type}${PARSER}` as 'videoParser' | 'gifParser';
      const parser = this.module[parserMethod];

      if (!parser) {
        throw new Error(`Parser not found for ${type} in ${this.module.name}`);
      }

      const data = parser($, body) as T[];

      if (!data.length) {
        throw new Error(
          `No results found for "${this.module.query}" on ${this.module.name} (page ${page})`
        );
      }

      return data;
    } catch (error) {
      // If error is already one of our specific errors (from parsing), preserve it
      if (
        error instanceof Error &&
        (error.message.includes('Parser not found') || error.message.includes('No results found'))
      ) {
        throw error;
      }

      // For network/axios errors, wrap with helpful context
      console.warn(error);
      throw new Error(
        `Failed to search for "${this.module.query}" on ${this.module.name} (page ${page}). ` +
          `This could be due to network issues, site changes, or no results being available.`
      );
    }
  }

  /**
   * Change the current module/driver
   * @param driver - Module name (e.g., 'pornhub', 'sex', 'redtube')
   * @param query - Optional new search query
   * @returns This instance for method chaining
   * @throws Error if the specified module is not supported
   */
  driver(driver: string = 'pornhub', query?: string): this {
    const normalizedDriver = driver.toLowerCase();
    const PornModule = this.modules[normalizedDriver];

    if (!PornModule) {
      const supportedModules = this.support().join(', ');
      throw new Error(
        `Module "${driver}" is not supported. Supported modules are: ${supportedModules}`
      );
    }

    this.module = new PornModule(query || this.query);

    return this;
  }

  /**
   * Update the search query for the current module
   * @param query - New search query string
   * @returns This instance for method chaining
   * @throws Error if query is empty or only whitespace
   * @example
   * ```typescript
   * const searcher = new Pornsearch();
   * searcher.setQuery('amateur').videos();
   * ```
   */
  setQuery(query: string): this {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty or whitespace-only.');
    }
    this.module.query = query;
    return this;
  }

  /**
   * Static factory method to create a new Pornsearch instance
   * @param query - Search query string
   * @returns New Pornsearch instance with default 'pornhub' driver
   * @example
   * ```typescript
   * const searcher = Pornsearch.search('amateur');
   * const videos = await searcher.videos();
   * ```
   */
  static search(query: string): Pornsearch {
    return new Pornsearch(query);
  }
}

export default Pornsearch;
