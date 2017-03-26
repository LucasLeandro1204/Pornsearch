'use strict';

const axios   = require('axios');
const cheerio = require('cheerio');

const xVideos = {

  videos(relation, page = 0) {
    let url = `https://www.xvideos.com/?k=${relation}&p=${page}`;

    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          resolve(this.video.parse(response.data));
        })
        .catch((error) => {
          console.log(error);
          reject(`No results for search related to ${relation} in page ${page}`);
        });
    });
  },

  video: {
    parse(body) {
      const $ = cheerio.load(body);
      let videos = $('#content .mozaique .thumb-block');

      return videos.map((i, video) => this.format($(video))).get();
    },

    format(video) {
      let $ = cheerio.load(video.find('.thumb script').text().match(/(<.*>)/)[0]);
      let description = video.find('p');

      return {
        title: description.eq(0).text(),
        url: 'https://xvideos.com' + $('a').attr('href'),
        duration: description.find('strong').text(),
        thumb: $('img').attr('src')
      };
    }
  }
};

module.exports = xVideos;