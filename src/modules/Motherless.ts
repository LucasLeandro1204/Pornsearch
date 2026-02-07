import * as cheerio from 'cheerio';
import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video } from '../types';

class Motherless extends AbstractModule.with(VideoMixin) {
  get name(): string {
    return 'Motherless';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `http://www.motherless.com/term/videos/${this.query}?page=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    const videos = $('div.browse div.content-wrapper:nth-child(7) div.thumb-container');

    return videos
      .map((index: number, element: cheerio.Element) => {
        const data = $(element);

        if (!data.length) {
          return undefined;
        }

        const thumb = data.find('img.static').attr('src') || '';

        return {
          title: data.find('.title').text().trim(),
          url: `${data.find('a').eq(0).attr('href')}`,
          duration: data.find('.captions div.caption.left').text(),
          thumb,
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }
}

export default Motherless;
