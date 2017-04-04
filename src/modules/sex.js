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
    let url = ``;

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

      return '';
    },

    format(video) {
    }
  },

  gif: {
    parse(body) {
    },

    format(gif) {

    }
  }
}

module.exports = Sex;