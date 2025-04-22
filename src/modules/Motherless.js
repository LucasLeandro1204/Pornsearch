import Video from 'core/VideoMixin';
import Gif from 'core/GifMixin';
import AbstractModule from 'core/AbstractModule';

class Motherless extends AbstractModule.with(Video, Gif) {
  get name () {
    return 'Motherless';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `http://www.motherless.com/term/videos/${this.query}?page=${page || this.firstpage}`;
  }

  gifUrl (page) {
    return `http://www.motherless.com/term/gifs/${this.query}?page=${page || this.firstpage}`;
  }

  videoParser ($) {
    const videos = $('div.browse div.content-wrapper:nth-child(7) div.thumb-container');

    return videos.map((i) => {
      const data = videos.eq(i);

      if (!data.length) {
        return;
      }

      const thumb = data.find('img.static').attr('src') || '';

      return {
        title: data.find('.title').text().trim(),
        url: `${data.find('a').eq(0).attr('href')}`,
        duration: data.find('.captions div.caption.left').text(),
        thumb: thumb
      };
    }).get();
  }

  gifParser ($) {
    const gifs = $('div.browse div.content-wrapper:nth-child(7) div.thumb-container');

    return gifs.map((i) => {
      const data = gifs.eq(i);

      if (!data.length) {
        return;
      }

      const thumb = data.find('img.static').attr('src') || '';

      return {
        title: data.find('.title').text().trim(),
        url: `${data.find('a').eq(0).attr('href')}`,
        thumb: thumb
      };
    }).get();
  }
}

export default Motherless;
