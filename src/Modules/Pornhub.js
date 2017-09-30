import AbstractModule from '../Core/AbstractModule';

class Pornhub extends AbstractModule {
  get name () {
    return 'Pornhub';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `http://www.pornhub.com/video/search?search=${this.query}&page=${page || this.firstpage}`;
  }

  gifUrl (page) {
    return `http://www.pornhub.com/gifs/search?search=${this.query}&page=${page || this.firstpage}`;
  }

  videoParser ($) {
    const videos = $('ul.videos.search-video-thumbs li');

    return videos.map((i, video) => {
      video = $(video);

      const data = video.find('a').eq(0);

      return data.length 
        ? {
          title: data.find('img').attr('title'),
          url: 'http://pornhub.com/' + data.attr('href'),
          duration: data.find('.duration').text(),
          thumb: data.find('img').attr('data-mediumthumb').replace('(m=ecuK8daaaa)', '')
        } 
        : undefined;
    }).get();
  }

  gifParser ($) {
    const gifs = $('ul.gifs.gifLink li');

    return gifs.map((i, gif) => {
      gif = $(gif);
      
      const data = gif.find('a');

      return {
        title: data.find('span').text(),
        url: 'http://dl.phncdn.com#id#.gif'.replace('#id#', data.attr('href')),
        webm: data.find('video').attr('data-webm')
      };
    }).get();
  }
}

export default Pornhub;
