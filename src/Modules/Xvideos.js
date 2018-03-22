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
      video = $.load($(video).find('.thumb script').text().match(/(<.*>)/)
        .pop());
      const description = video.find('p');

      return {
        title: description.eq(0).text(),
        url: `https://xvideos.com${$('a').attr('href')}`,
        duration: description.find('strong').text(),
        thumb: $('img').attr('src'),
      };
    }).get();
  }
}

export default Xvideos;
