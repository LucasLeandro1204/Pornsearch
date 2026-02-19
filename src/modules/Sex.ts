import GifMixin from '../core/GifMixin';
import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video, Gif } from '../types';
import type { CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';

class Sex extends AbstractModule.with(GifMixin, VideoMixin) {
  get name(): string {
    return 'Sex';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `http://www.sex.com/search/videos?query=${encodeURIComponent(this.query)}&page=${page ?? this.firstpage}`;
  }

  gifUrl(page?: number): string {
    return `http://www.sex.com/search/gifs?query=${encodeURIComponent(this.query)}&page=${page ?? this.firstpage}`;
  }

  videoParser($: CheerioAPI): Video[] {
    const videos = $('.video-card');

    return videos
      .map((_index: number, element: Element) => {
        const cached = $(element);
        const link = cached.find('a[title]');
        const href = link.attr('href');

        if (!href) {
          return undefined;
        }

        const title = link.text();
        const duration = cached.find('.duration').text();

        return {
          title,
          url: `http://www.sex.com${href}`,
          duration,
          thumb: cached.find('img').attr('src') as string,
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }

  gifParser($: CheerioAPI): Gif[] {
    const gifs = $('#masonry_container .masonry_box').not('.ad_box');

    return gifs
      .map((_index: number, element: Element) => {
        const data = $(element).find('a[title]');
        const title = data.attr('title');
        const url = data.find('img').attr('src') as string;

        if (!url) {
          return undefined;
        }

        return {
          title: title ?? url,
          url,
        };
      })
      .get()
      .filter((item: Gif | undefined): item is Gif => item !== undefined);
  }
}

export default Sex;
