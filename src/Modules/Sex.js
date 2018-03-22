import Gif from 'Core/GifMixin';
import Video from 'Core/VideoMixin';
import AbstractModule from 'Core/AbstractModule';

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
    const videos = $('#masonry_container .masonry_box').has('.duration');

    return videos.map((i, video) => {
      const cached = $(video);
      const title = cached.find('.title a');

      return {
        title: title.text(),
        url: `http://www.sex.com${title.attr('href')}`,
        duration: cached.find('.duration').text(),
        thumb: cached.find('.image').data('src'),
      };
    }).get();
  }

  gifParser ($) {
    const gifs = $('#masonry_container .masonry_box').not('.ad_box');

    return gifs.map((i, gif) => {
      const data = $(gif).find('.image');

      return {
        title: data.attr('alt'),
        url: data.data('src'),
      };
    }).get();
  }
}

export default Sex;
