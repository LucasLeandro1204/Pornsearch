import AbstractModule from '../Core/AbstractModule';

class Xhamster extends AbstractModule {
  get name () {
    return 'xHamster';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `https://xhamster.com/search?q=${this.query}&p=${page || this.firstpage}`;
  }

  videoParser ($) {
    const videos = $('#searchRes2 .video');

    return videos.map(i => {
      const data = videos.eq(i);

      return data.length
        ? {
          title: data.find('a u').text().trim(),
          url: data.find('a').eq(0).attr('href'),
          duration: data.find('a b').text(),
          thumb: data.find('.thumb').attr('src').replace(/\([^)]*\)/g, '')
        }
        : undefined;
    }).get();
  }
}

export default Xhamster;
