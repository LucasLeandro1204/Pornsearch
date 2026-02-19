import { OverwriteError } from './OverwriteError';
import { Gif, Constructor } from '../types';
import type { CheerioAPI } from 'cheerio';

/**
 * Mixin that adds GIF search functionality to a module
 * Classes using this mixin must override gifUrl() and gifParser()
 * @param Base - The base class to extend
 * @returns Extended class with GIF functionality
 */
export default function GifMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    /**
     * Generate URL for GIF search
     * @param page - Optional page number
     * @returns URL string for fetching GIFs
     * @throws OverwriteError if not implemented by subclass
     */
    gifUrl(_page?: number): string {
      throw new OverwriteError();
    }

    /**
     * Parse HTML/data to extract GIF information
     * @param $ - Cheerio instance for HTML parsing
     * @param body - Optional raw response body
     * @returns Array of Gif objects
     * @throws OverwriteError if not implemented by subclass
     */
    gifParser(_$: CheerioAPI, _body?: string): Gif[] {
      throw new OverwriteError();
    }
  };
}
