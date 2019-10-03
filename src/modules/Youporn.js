import Video from 'core/VideoMixin';
import AbstractModule from 'core/AbstractModule';

class Youporn extends AbstractModule.with(Video) {
  get name () {
    return 'Youporn';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `http://www.youporn.com/search/?query=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser ($) {
    const videos = $('div.sixteen-column.searchResults div.video-box');

    return videos.map((i) => {
      const data = videos.eq(i);

      if (!data.length) {
        return;
      }

      const thumb = data.find('img').attr('data-original') || '';

      return {
        title: data.find('.video-box-title').text().trim(),
        url: `http://youporn.com${data.find('a').eq(0).attr('href')}`,
        duration: data.find('.video-duration').text(),
        thumb: thumb
      };
    }).get();
  }
}

export default Youporn;
