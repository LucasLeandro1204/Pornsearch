import VideoMixin from '../core/VideoMixin';
import GifMixin from '../core/GifMixin';
import AbstractModule from '../core/AbstractModule';
import { Video, Gif } from '../types';
import type { CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';

class Motherless extends AbstractModule.with(VideoMixin, GifMixin) {
  get name(): string {
    return 'Motherless';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `http://www.motherless.com/term/videos/${encodeURIComponent(this.query)}?page=${page || this.firstpage}`;
  }

  gifUrl(page?: number): string {
    return `http://www.motherless.com/term/gifs/${encodeURIComponent(this.query)}?page=${page || this.firstpage}`;
  }

  videoParser($: CheerioAPI): Video[] {
    const videos = $('div.browse div.content-wrapper:nth-child(7) div.thumb-container');

    return videos
      .map((_index: number, element: Element) => {
        const data = $(element);

        if (!data.length) {
          return undefined;
        }

        const href = data.find('a').eq(0).attr('href');
        if (!href) {
          return undefined;
        }

        const thumb = data.find('img.static').attr('src') || '';

        return {
          title: data.find('.title').text().trim(),
          url: href,
          duration: data.find('.captions div.caption.left').text(),
          thumb,
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }

  gifParser($: CheerioAPI): Gif[] {
    const gifs = $('div.browse div.content-wrapper:nth-child(7) div.thumb-container');

    return gifs
      .map((_index: number, element: Element) => {
        const data = $(element);

        if (!data.length) {
          return undefined;
        }

        const href = data.find('a').eq(0).attr('href');
        if (!href) {
          return undefined;
        }

        const thumb = data.find('img.static').attr('src') || '';

        return {
          title: data.find('.title').text().trim(),
          url: href,
          thumb,
        };
      })
      .get()
      .filter((item: Gif | undefined): item is Gif => item !== undefined);
  }
}

export default Motherless;
