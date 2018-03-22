import Gif from 'core/GifMixin';
import Video from 'core/VideoMixin';
import AbstractModule from 'core/AbstractModule';

class Sex extends AbstractModule.with(Gif, Video) {
  get name () {
    return 'Sex';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `http://www.sex.com/search/videos?query=${this.query}&page=${page || this.firstpage}`;
  }

  gifUrl (page) {
    return `http://www.sex.com/search/gifs?query=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser ($) {
    const videos = $('#masonry_container .masonry_box');

    return videos.map((i, video) => {
      const cached = $(video);
      const link = cached.find('.title a');
      const title = link.text();
      const duration = cached.find('.duration').text();

      if (!title || !duration) {
        return;
      }

      return {
        title,
        url: `http://www.sex.com${link.attr('href')}`,
        duration,
        thumb: cached.find('.image').data('src'),
      };
    }).get();
  }

  gifParser ($) {
    const gifs = $('#masonry_container .masonry_box').not('.ad_box');

    return gifs.map((i, gif) => {
      const data = $(gif).find('a.image_wrapper');
      const title = data.attr('title');
      const url = data.find('img').data('src');

      if (!title || !url) {
        return;
      }

      return {
        title,
        url,
      };
    }).get();
  }
}

export default Sex;
