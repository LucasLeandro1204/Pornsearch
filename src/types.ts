import * as cheerio from 'cheerio';

/**
 * Represents a video with metadata
 */
export interface Video {
  /** Video title */
  title: string;
  /** Full URL to the video page */
  url: string;
  /** Duration string (e.g., "12:34" or "1:23:45") */
  duration: string;
  /** URL to the video thumbnail image */
  thumb: string;
}

/**
 * Represents an animated GIF with metadata
 */
export interface Gif {
  /** GIF title */
  title: string;
  /** URL to the GIF image */
  url: string;
  /** Optional URL to WebM video version (better performance) */
  webm?: string;
  /** Optional URL to the GIF thumbnail image */
  thumb?: string;
}

/**
 * Content type identifier
 */
export type ContentType = 'gif' | 'video';

/**
 * Parser function type for videos
 */
export type VideoParser = ($: cheerio.Root, body?: string) => Video[];

/**
 * Parser function type for GIFs
 */
export type GifParser = ($: cheerio.Root, body?: string) => Gif[];

/**
 * URL generator function type
 */
export type UrlGenerator = (page?: number) => string;

/**
 * Interface that all module implementations must satisfy
 * Modules can support video search, GIF search, or both
 */
export interface ModuleInterface {
  /** Module name (e.g., "Pornhub", "Sex") */
  readonly name: string;
  /** First page number (usually 0 or 1) */
  readonly firstpage: number;
  /** Search query string */
  query: string;
  /** Optional: Generate URL for video search */
  videoUrl?: UrlGenerator;
  /** Optional: Generate URL for GIF search */
  gifUrl?: UrlGenerator;
  /** Optional: Parse response to extract videos */
  videoParser?: VideoParser;
  /** Optional: Parse response to extract GIFs */
  gifParser?: GifParser;
}

/**
 * Type for module constructor functions
 */
export type ModuleConstructor = new (query?: string) => ModuleInterface;
