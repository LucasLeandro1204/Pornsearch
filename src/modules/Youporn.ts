import * as cheerio from 'cheerio';
import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video } from '../types';

class Youporn extends AbstractModule.with(VideoMixin) {
  get name(): string {
    return 'Youporn';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `http://www.youporn.com/search/?query=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    const videos = $('div.sixteen-column.searchResults div.video-box');

    return videos
      .map((_index: number, element: cheerio.Element) => {
        const data = $(element);

        if (!data.length) {
          return undefined;
        }

        const href = data.find('a').eq(0).attr('href');
        if (!href) {
          return undefined;
        }

        const thumb = data.find('img').attr('data-original') || '';

        return {
          title: data.find('.video-box-title').text().trim(),
          url: `http://youporn.com${href}`,
          duration: data.find('.video-duration').text(),
          thumb,
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }
}

export default Youporn;
