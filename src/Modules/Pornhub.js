'use strict';

let AbstractModule = require('../Core/AbstractModule');

class Pornhub extends AbstractModule {
  get name () {
    return 'pornhub';
  }

  videoUrl (page = 1) {
    return `http://www.pornhub.com/video/search?search=${this.query}&page=${page}`;
  }

  videoUrl (page = 1) {
    return `http://www.pornhub.com/gifs/search?search=${this.query}&page=${page}`;
  }
};

module.exports = Pornhub;