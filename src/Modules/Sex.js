'use strict';

let AbstractModule = require('../Core/AbstractModule');

class Sex extends AbstractModule {
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
    let videos = $('#masonry_container .masonry_box').has('.duration');

    return videos.map((i, video) => {
      video = $(video);
      
      let title = video.find('.title a');
      
      return {
        title: title.text(),
        url: 'http://www.sex.com' + title.attr('href'),
        duration: video.find('.duration').text(),
        thumb: video.find('.image').data('src')
      };
    }).get();
  }

  gifParser ($) {
    let gifs = $('#masonry_container .masonry_box').not('.ad_box');

    return gifs.map((i, gif) => {
      gif = $(gif);

      let data = gif.find('.image');

      return {
        title: data.attr('alt'),
        url: data.data('src')
      }
    }).get();
  }
};

module.exports = Sex;