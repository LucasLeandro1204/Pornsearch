const Axios = require('axios');

const GIF = 'gif';
const VIDEO = 'video';
const PARSER = 'Parser';

const AbstractModule = {
  query: '',

  get name () {
    throw new Error('This function must be overwrite');
  },

  get videourl () {
    throw new Error(`${this.name} doesn't support video search`);
  },

  get gifurl () {
    throw new Error(`${this.name} doesn't support gif search`);
  },

  gifs (page = 1) {
    this.call(this.gifurl, page, GIF);
  },

  call (url, type) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          resolve(this[type + PARSER]());
        })
        .catch((error) => {
          console.log(error);
          reject(`No results for search related to ${this.query} in page ${this.page}`);
        });
    });
  }
};

module.exports = AbstractModule;