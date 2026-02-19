import VideoMixin from '../core/VideoMixin';
import AbstractModule from '../core/AbstractModule';
import { Video } from '../types';
import type { CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';

class Xvideos extends AbstractModule.with(VideoMixin) {
  get name(): string {
    return 'xVideos';
  }

  get firstpage(): number {
    return 0;
  }

  videoUrl(page?: number): string {
    return `https://www.xvideos.com/?k=${encodeURIComponent(this.query)}&p=${page ?? this.firstpage}`;
  }

  videoParser($: CheerioAPI): Video[] {
    const videos = $('#content .mozaique .thumb-block');

    return videos
      .map((_index: number, element: Element) => {
        const cache = $(element);
        const title = cache.find('p a').eq(0);
        const href = title.attr('href');
        const thumbSrc = (cache.find('.thumb img').data('src') as string) || '';

        if (!href) {
          return undefined;
        }

        return {
          title: title.text(),
          url: `https://xvideos.com${href}`,
          duration: cache.find('.duration').text(),
          thumb: thumbSrc
            ? thumbSrc.replace('thumbs169', 'thumbs169lll').replace('THUMBNUM', '5')
            : '',
        };
      })
      .get()
      .filter((item: Video | undefined): item is Video => item !== undefined);
  }
}

export default Xvideos;
