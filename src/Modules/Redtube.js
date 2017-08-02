'use strict';

let AbstractModule = require('../Core/AbstractModule');

class Redtube extends AbstractModule {
  get name () {
    return 'Redtube';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=${this.query}&thumbsize=big&page=${page || this.firstpage}`;
  }

  videoParser ($, { videos }) {
    return videos.map(({ video }) => {
      return {
        title: video.title,
        url: video.url,
        duration: video.duration,
        thumb: video.default_thumb,
      };
    });
  }
};

module.exports = Redtube;