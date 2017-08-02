'use strict';

const AbstractModule = require('./Core/AbstractModule');
const Axios          = require('axios');
const Cheerio        = require('cheerio');
const FS             = require('fs');
const Path           = require('path');

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
    let module = this.modules.find(module => module.name.toLowerCase() == driver.toLowerCase());

    if (! module) {
      throw new Error(`We don't support ${driver} by now =/`);
    }

    this.module = module;

    return this;
  }

  load () {
    let dir = Path.resolve('./src/Modules');
    let files = FS.readdirSync(dir, 'UTF-8');

    this.modules = files.map(file => AbstractModule.extendsToMe(new (require(Path.resolve(dir, file)))));

    return this;
  }

  static search (query) {
    return new this(query);
  }
};

module.exports = Pornsearch;