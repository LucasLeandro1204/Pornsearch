import Gif from 'core/GifMixin';
import Video from 'core/VideoMixin';
import AbstractModule from 'core/AbstractModule';

class Pornhub extends AbstractModule.with(Gif, Video) {
  get name () {
    return 'Pornhub';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `http://www.pornhub.com/video/search?search=${this.query}&page=${page || this.firstpage}`;
  }

  gifUrl (page) {
    return `http://www.pornhub.com/gifs/search?search=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser ($) {
    const videos = $('ul.videos.search-video-thumbs li');

    return videos.map((i) => {
      const data = videos.eq(i);

      if (!data.length) {
        return;
      }

      const thumb = data.find('img').attr('data-mediumthumb') || '';

      return {
        title: data.find('a').text().trim(),
        url: `http://pornhub.com${data.find('a').eq(0).attr('href')}`,
        duration: data.find('.duration').text(),
        thumb: thumb.replace(/\([^)]*\)/g, ''),
      };
    }).get();
  }

  gifParser ($) {
    const gifs = $('ul.gifs.gifLink li');

    return gifs.map((i, gif) => {
      const data = $(gif).find('a');

      return {
        title: data.find('span').text(),
        url: 'http://dl.phncdn.com#id#.gif'.replace('#id#', data.attr('href')),
        webm: data.find('video').attr('data-webm'),
      };
    }).get();
  }
}

export default Pornhub;
