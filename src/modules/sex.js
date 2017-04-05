'use strict';

const axios   = require('axios');
const cheerio = require('cheerio');

const Sex = {

  videos(relation, page = 1) {
    let url = `http://www.sex.com/search/videos?query=${relation}&page=${page}`;

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

  gifs(relation, page = 1) {
    let url = `http://www.sex.com/search/gifs?query=${relation}&page=${page}`;

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
      let videos = $('#masonry_container .masonry_box').has('.duration');

      return videos.map((i, video) => this.format($(video))).get();
    },

    format(video) {
      let title = video.find('.title a');
      
      return {
        title: title.text(),
        url: 'http://www.sex.com' + title.attr('href'),
        duration: video.find('.duration').text(),
        thumb: video.find('.image').data('src')
      };
    }
  },

  gif: {
    parse(body) {
      const $ = cheerio.load(body);
      let gifs = $('#masonry_container .masonry_box').not('.ad_box');

      return gifs.map((i, gif) => this.format($(gif))).get();
    },

    format(gif) {
      let data = gif.find('.image');

      return {
        title: data.attr('alt'),
        url: data.data('src')
      }
    }
  }
}

module.exports = Sex;
