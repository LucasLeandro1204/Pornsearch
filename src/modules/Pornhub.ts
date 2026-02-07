import * as cheerio from 'cheerio';
import GifMixin from 'core/GifMixin';
import VideoMixin from 'core/VideoMixin';
import AbstractModule from 'core/AbstractModule';
import { Video, Gif } from '../types';

class Pornhub extends AbstractModule.with(GifMixin, VideoMixin) {
  get name(): string {
    return 'Pornhub';
  }

  get firstpage(): number {
    return 1;
  }

  videoUrl(page?: number): string {
    return `http://www.pornhub.com/video/search?search=${this.query}&page=${page || this.firstpage}`;
  }

  gifUrl(page?: number): string {
    return `http://www.pornhub.com/gifs/search?search=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser($: cheerio.Root): Video[] {
    const videos = $('ul.videos.search-video-thumbs li');

    return videos
      .map((_i: any) => {
        const data = videos.eq(_i);

        if (!data.length) {
          return undefined;
        }

        const thumb = data.find('img').attr('data-mediumthumb') || '';

        return {
          title: data.find('a').text().trim(),
          url: `http://pornhub.com${data.find('a').eq(0).attr('href')}`,
          duration: data.find('.duration').text(),
          thumb: thumb.replace(/\([^)]*\)/g, ''),
        };
      })
      .get()
      .filter((item: any): item is Video => item !== undefined);
  }

  gifParser($: cheerio.Root): Gif[] {
    const gifs = $('ul.gifs.gifLink li');

    return gifs
      .map((_i: any, gif: any) => {
        const data = $(gif).find('a');

        return {
          title: data.find('span').text(),
          url: 'http://dl.phncdn.com#id#.gif'.replace('#id#', data.attr('href') || ''),
          webm: data.find('video').attr('data-webm'),
        };
      })
      .get();
  }
}

export default Pornhub;
