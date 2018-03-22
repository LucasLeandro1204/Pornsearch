import Video from 'Core/VideoMixin';
import AbstractModule from 'Core/AbstractModule';

class Xvideos extends AbstractModule.with(Video) {
  get name () {
    return 'xVideos';
  }

  get firstpage () {
    return 0;
  }

  videoUrl (page) {
    return `https://www.xvideos.com/?k=${this.query}&p=${page || this.firstpage}`;
  }

  videoParser ($) {
    const videos = $('#content .mozaique .thumb-block');

    return videos.map((i, video) => {
      const cache = $(video);
      const title = cache.find('p a').eq(0);

      return {
        title: title.text(),
        url: `https://xvideos.com${title.attr('href')}`,
        duration: cache.find('.duration').text(),
        thumb: cache.find('.thumb img').data('src').replace('thumbs169', 'thumbs169lll').replace('THUMBNUM', '5'),
      };
    }).get();
  }
}

export default Xvideos;
