'use strict';

let AbstractModule = require('../Core/AbstractModule');

class Pornhub extends AbstractModule {
  get name () {
    return 'pornhub';
  }

  get firstpage () {
    return 1;
  }

  videoUrl (page) {
    return `http://www.pornhub.com/video/search?search=${this.query}&page=${page || this.firstpage}`;
  }

  videoUrl (page) {
    return `http://www.pornhub.com/gifs/search?search=${this.query}&page=${page || this.firstpage}`;
  }
};

module.exports = Pornhub;