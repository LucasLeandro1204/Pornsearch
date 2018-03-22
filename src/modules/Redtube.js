/* eslint max-len: 0 */

import Video from 'core/VideoMixin';
import AbstractModule from 'core/AbstractModule';

class Redtube extends AbstractModule.with(Video) {
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
    return videos.map(({ video }) => ({
      title: video.title,
      url: video.url,
      duration: video.duration,
      thumb: video.default_thumb,
    }));
  }
}

export default Redtube;
