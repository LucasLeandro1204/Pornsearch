import * as cheerio from 'cheerio';

export interface Video {
  title: string;
  url: string;
  duration: string;
  thumb: string;
}

export interface Gif {
  title: string;
  url: string;
  webm?: string;
}

export type ContentType = 'gif' | 'video';

export interface ModuleInterface {
  readonly name: string;
  readonly firstpage: number;
  query: string;
  videoUrl?(page?: number): string;
  gifUrl?(page?: number): string;
  videoParser?($: cheerio.Root, body?: string): Video[];
  gifParser?($: cheerio.Root, body?: string): Gif[];
}

export type ModuleConstructor = new (query?: string) => ModuleInterface;
