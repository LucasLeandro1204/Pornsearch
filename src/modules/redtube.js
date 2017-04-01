'use strict';

const axios = require('axios');

const Redtube = {

  videos(relation, page = 1) {
    let url = `https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=${relation}&thumbsize=big&page=${page}`;

    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          resolve(this.video.format(response.data.videos));
        })
        .catch((error) => {
          console.log(error);
          reject(`No results for search related to ${relation} in page ${page}`);
        });
    });
  },

  video: {
    format(video) {
    }
  }
};

module.exports = Redtube;