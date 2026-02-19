import { OverwriteError } from './OverwriteError';
import { Video } from '../types';
import type { CheerioAPI } from 'cheerio';

type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Mixin that adds Video search functionality to a module
 * Classes using this mixin must override videoUrl() and videoParser()
 * @param Base - The base class to extend
 * @returns Extended class with Video functionality
 */
export default function VideoMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    /**
     * Generate URL for video search
     * @param page - Optional page number
     * @returns URL string for fetching videos
     * @throws OverwriteError if not implemented by subclass
     */
    videoUrl(_page?: number): string {
      throw new OverwriteError();
    }

    /**
     * Parse HTML/data to extract video information
     * @param $ - Cheerio instance for HTML parsing
     * @param body - Optional raw response body
     * @returns Array of Video objects
     * @throws OverwriteError if not implemented by subclass
     */
    videoParser(_$: CheerioAPI, _body?: string): Video[] {
      throw new OverwriteError();
    }
  };
}
