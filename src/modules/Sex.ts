import * as cheerio from 'cheerio';
import GifMixin from '../core/GifMixin';
import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video, Gif } from '../types';

class Sex extends AbstractModule.with(GifMixin, VideoMixin) {
  get name(): string {
    return 'Sex';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `http://www.sex.com/search/videos?query=${this.query}&page=${page || this.firstpage}`;
  }

  gifUrl(page?: number): string {
    return `http://www.sex.com/search/gifs?query=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    const videos = $('#masonry_container .masonry_box');

    return videos
      .map((index: number, element: cheerio.Element) => {
        const cached = $(element);
        const link = cached.find('.title a');
        const title = link.text();
        const duration = cached.find('.duration').text();

        if (!title || !duration) {
          return undefined;
        }

        return {
          title,
          url: `http://www.sex.com${link.attr('href')}`,
          duration,
          thumb: cached.find('.image').data('src') as string,
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }

  gifParser($: cheerio.Root): Gif[] {
    const gifs = $('#masonry_container .masonry_box').not('.ad_box');

    return gifs
      .map((index: number, element: cheerio.Element) => {
        const data = $(element).find('a.image_wrapper');
        const title = data.attr('title');
        const url = data.find('img').data('src') as string;

        if (!title || !url) {
          return undefined;
        }

        return {
          title,
          url,
        };
      })
      .get()
      .filter((item: Gif | undefined): item is Gif => item !== undefined);
  }
}

export default Sex;
