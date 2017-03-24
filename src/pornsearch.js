'use strict';

const axios   = require('axios');
const cheerio = require('cheerio');

const Pornsearch = {

  videos(relation, page = 1, category = 0) {
    let url = `http://www.pornhub.com/video/search?search=${relation}&page=${page}&filter_category=${category}`;

    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          resolve(this.video.parse(response.data));
        })
        .catch((error) => {
          reject(`No results for search related to ${relation} in page ${page} and category number ${0}`);
        });
    });
  },

  video: {
    parse(body) {
      const $ = cheerio.load(body);
      let videos = $('ul.videos.search-video-thumbs li');

      return videos.map((i, video) => this.format($(video))).get();
    },

    format(video) {
      let data = video.find('a').eq(0);

      if (data.length !== 1) {
        return undefined;
      }

      return {
        title: data.attr('title'),
        url: 'http://pornhub.com/' + data.attr('href'),
        duration: data.find('.duration').text(),
        thumb: data.find('img').attr('data-mediumthumb')
      };
    }
  }
};

module.exports = Pornsearch;