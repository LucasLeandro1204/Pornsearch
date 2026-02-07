import axios from 'axios';
import * as cheerio from 'cheerio';
import modules from './core/Modules';
import { ModuleInterface, Video, Gif, ContentType } from './types';

const GIF: ContentType = 'gif';
const PARSER = 'Parser';
const VIDEO: ContentType = 'video';

class Pornsearch {
  private module: ModuleInterface;
  private modules: typeof modules;

  constructor(query?: string, driver?: string) {
    this.modules = modules;
    this.module = {} as ModuleInterface;
    this.driver(driver, query);
  }

  support(): string[] {
    return Object.keys(this.modules);
  }

  current(): string {
    return this.module.name;
  }

  get query(): string {
    return this.module.query || '';
  }

  gifs(page?: number): Promise<Gif[]> {
    if (!this.module.gifUrl) {
      throw new Error(`Gif search is not supported for ${this.module.name}`);
    }
    return this._get(this.module.gifUrl(page), GIF, page || this.module.firstpage);
  }

  videos(page?: number): Promise<Video[]> {
    if (!this.module.videoUrl) {
      throw new Error(`Video search is not supported for ${this.module.name}`);
    }
    return this._get(this.module.videoUrl(page), VIDEO, page || this.module.firstpage);
  }

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

  driver(driver: string = 'pornhub', query?: string): this {
    const PornModule = this.modules[driver.toLowerCase()];

    if (!PornModule) {
      throw new Error(`We don't support ${driver} by now =/`);
    }

    this.module = new PornModule(query || this.query);

    return this;
  }

  static search(query: string): Pornsearch {
    return new Pornsearch(query);
  }
}

export default Pornsearch;
