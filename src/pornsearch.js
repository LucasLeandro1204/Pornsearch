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

  gifs(relation, page = 1) {
    let url = `http://www.pornhub.com/gifs/search?search=${relation}&page=${page}`;

    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          resolve(this.gif.parse(response.data));
        })
        .catch((error) => {
          reject(`No results for search related to ${relation} in page ${page}`);
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
        title: data.find('img').attr('title'),
        url: 'http://pornhub.com/' + data.attr('href'),
        duration: data.find('.duration').text(),
        thumb: data.find('img').attr('data-mediumthumb').replace('(m=ecuK8daaaa)', '')
      };
    }
  },

  gif: {
    parse(body) {
      const $ = cheerio.load(body);
      let gifs = $('ul.gifs.gifLink li');

      return gifs.map((i, gif) => this.format($(gif))).get();
    },

    format(gif) {
      let data = gif.find('a');

      return {
        title: data.find('span').text(),
        url: 'http://dl.phncdn.com#id#.gif'.replace('#id#', data.attr('href')),
        webm: data.find('video').attr('data-webm')
      };
    }
  }
};

module.exports = Pornsearch;