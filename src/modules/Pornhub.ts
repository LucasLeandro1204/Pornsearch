import GifMixin from '../core/GifMixin';
import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video, Gif } from '../types';
import type { CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';

class Pornhub extends AbstractModule.with(GifMixin, VideoMixin) {
  get name(): string {
    return 'Pornhub';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `http://www.pornhub.com/video/search?search=${encodeURIComponent(this.query)}&page=${page ?? this.firstpage}`;
  }

  gifUrl(page?: number): string {
    return `http://www.pornhub.com/gifs/search?search=${encodeURIComponent(this.query)}&page=${page ?? this.firstpage}`;
  }

  videoParser($: CheerioAPI): Video[] {
    const videos = $('ul.videos.search-video-thumbs li');

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

        const thumb = data.find('img').attr('data-mediumthumb') || '';

        return {
          title: data.find('a').attr('title')?.trim() ?? '',
          url: `http://pornhub.com${href}`,
          duration: data.find('.duration').text(),
          thumb: thumb.replace(/\([^)]*\)/g, ''),
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }

  gifParser($: CheerioAPI): Gif[] {
    const gifs = $('ul.gifs.gifLink li');

    return gifs
      .map((_index: number, element: Element) => {
        const data = $(element).find('a');
        const href = data.attr('href');

        if (!href) {
          return undefined;
        }

        return {
          title: data.find('span').text(),
          url: 'http://dl.phncdn.com#id#.gif'.replace('#id#', href),
          webm: data.find('video').attr('data-webm'),
        };
      })
      .get()
      .filter((item: Gif | undefined): item is Gif => item !== undefined);
  }
}

export default Pornhub;
