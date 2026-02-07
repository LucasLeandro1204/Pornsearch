import * as cheerio from 'cheerio';
import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video } from '../types';

class Xvideos extends AbstractModule.with(VideoMixin) {
  get name(): string {
    return 'xVideos';
  }

  get firstpage(): number {
    return 0;
  }

  videoUrl(page?: number): string {
    return `https://www.xvideos.com/?k=${this.query}&p=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    const videos = $('#content .mozaique .thumb-block');

    return videos
      .map((_i: any, video: any) => {
        const cache = $(video);
        const title = cache.find('p a').eq(0);
        const thumbSrc = (cache.find('.thumb img').data('src') as string) || '';

        return {
          title: title.text(),
          url: `https://xvideos.com${title.attr('href')}`,
          duration: cache.find('.duration').text(),
          thumb: thumbSrc
            ? thumbSrc.replace('thumbs169', 'thumbs169lll').replace('THUMBNUM', '5')
            : '',
        };
      })
      .get();
  }
}

export default Xvideos;
