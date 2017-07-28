'use strict';

const Axios = require('axios');

const GIF = 'gif';
const VIDEO = 'video';
const PARSER = 'Parser';

class AbstractModule {
  constructor () {
    this.query = '';
  }

  get name () {
    throw new Error('This function must be overwrite');
  }

  get videourl () {
    throw new Error(`${this.name} doesn't support video search`);
  }

  get gifurl () {
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