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
   * Search for GIFs
   * @param page - Optional page number (default: first page of current module)
   * @returns Promise resolving to array of GIFs
   * @throws Error if the current module doesn't support GIF search
   */
  gifs(page?: number): Promise<Gif[]> {
    if (!this.module.gifUrl) {
      throw new Error(`Gif search is not supported for ${this.module.name}`);
    }
    return this._get(this.module.gifUrl(page), GIF, page || this.module.firstpage);
  }

  /**
   * Search for videos
   * @param page - Optional page number (default: first page of current module)
   * @returns Promise resolving to array of videos
   * @throws Error if the current module doesn't support video search
   */
  videos(page?: number): Promise<Video[]> {
    if (!this.module.videoUrl) {
      throw new Error(`Video search is not supported for ${this.module.name}`);
    }
    return this._get(this.module.videoUrl(page), VIDEO, page || this.module.firstpage);
  }

  /**
   * Internal method to fetch and parse content
   * @private
   */
  private _get<T extends Video | Gif>(url: string, type: ContentType, page: number): Promise<T[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(({ data: body }) => {
          const $ = cheerio.load(body);
          const parserMethod = `${type}${PARSER}` as 'videoParser' | 'gifParser';
          const parser = this.module[parserMethod];

          if (!parser) {
            throw new Error(`Parser not found for ${type}`);
          }

          const data = parser($, body) as T[];

          if (!data.length) {
            throw new Error('No results');
          }

          resolve(data);
        })
        .catch((error) => {
          console.warn(error);
          reject(
            new Error(`No results for search related to ${this.module.query} in page ${page}`)
          );
        });
    });
  }

  /**
   * Change the current module/driver
   * @param driver - Module name (e.g., 'pornhub', 'sex', 'redtube')
   * @param query - Optional new search query
   * @returns This instance for method chaining
   * @throws Error if the specified module is not supported
   */
  driver(driver: string = 'pornhub', query?: string): this {
    const PornModule = this.modules[driver.toLowerCase()];

    if (!PornModule) {
      throw new Error(`We don't support ${driver} by now =/`);
    }

    this.module = new PornModule(query || this.query);

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
