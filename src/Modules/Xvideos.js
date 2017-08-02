'use strict';

let AbstractModule = require('../Core/AbstractModule');

class Xvideos extends AbstractModule {
  get name () {
    return 'xVideos';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `https://www.xvideos.com/?k=${this.query}&p=${page || this.firstpage}`;
  }

  videoParser ($) {
    let videos = $('#content .mozaique .thumb-block');

    return videos.map((i, video) => {
      video = $.load($(video).find('.thumb script').text().match(/(<.*>)/).pop());
      let description = video.find('p');

      return {
        title: description.eq(0).text(),
        url: 'https://xvideos.com' + $('a').attr('href'),
        duration: description.find('strong').text(),
        thumb: $('img').attr('src')
      };
    }).get();
  }
};

module.exports = Xvideos;