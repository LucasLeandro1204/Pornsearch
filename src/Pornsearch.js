'use strict';

const AbstractModule = require('./Core/AbstractModule');
const Axios          = require('axios');
const Cheerio        = require('cheerio');

const pornhub = require('./Modules/Pornhub');
const redtube = require('./Modules/Redtube');
const sex     = require('./Modules/Sex');
const xvideos = require('./Modules/Xvideos');

const GIF    = 'gif';
const PARSER = 'Parser';
const VIDEO  = 'video';

class Pornsearch {
  constructor (query, driver = 'pornhub') {
    this.module = {};
    this.modules = [];

    this.load()
      .driver(driver)
      .search(query);
  }

  support () {
    return this.modules.map(module => module.name);
  }

  current () {
    return this.module.name;
  }

  get query () {
    return this.module.query || '';
  }

  search (query) {
    if (Object.keys(this.module).length != 0) {
      this.module.query = query;
    }

    return this;
  }

  gifs (page) {
    return this._get(this.module.gifUrl(page), GIF);
  }

  videos (page) {
    return this._get(this.module.videoUrl(page), VIDEO, page || this.module.firstpage);
  }

  _get (url, type, page) {
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then(({ data: body }) => {
          resolve(this.module[type + PARSER](Cheerio.load(body), body));
        })
        .catch((error) => {
          console.log(error);
          reject(`No results for search related to ${this.module.query} in page ${page}`);
        });
    });
  }

  driver (driver = '') {
    const currentQuery = this.query;
    const SearchModule = this.modules[driver.toLowerCase()];

    if (!SearchModule) {
      throw new Error(`We don't support ${driver} by now =/`);
    }

    this.module = new SearchModule(currentQuery);

    return this;
  }

  load () {
    this.modules = {
      pornhub,
      redtube,
      sex,
      xvideos
    };

    return this;
  }

  static search (query) {
    return new this(query);
  }
}

module.exports = Pornsearch;
