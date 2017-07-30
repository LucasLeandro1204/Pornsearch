'use strict';

const Axios = require('axios');

class AbstractModule {
  constructor () {
    this.query = '';
  }

  get name () {
    throw new Error('This function must be overwrite');
  }

  get firstpage () {
    throw new Error('This function must be overwrite');
  }

  videoUrl () {
    throw new Error(`${this.name} doesn't support video search`);
  }

  gifUrl () {
    throw new Error(`${this.name} doesn't support gif search`);
  }

  videoParser () {
    throw new Error('This function must be overwrite');
  }

  gifParser () {
    throw new Error('This function must be overwrite');
  }
};

module.exports = AbstractModule;