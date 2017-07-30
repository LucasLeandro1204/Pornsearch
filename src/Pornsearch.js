'use strict';

const AbstractModule = require('./Core/AbstractModule');
const FS             = require('fs');
const Path           = require('path');

const GIF = 'gif';
const VIDEO = 'video';
const PARSER = 'Parser';

const instaceofAbstractModule = ((module) => {
  if (! (module instanceof AbstractModule)) {
    throw new Error(`Module should be an instance of Abstract module`);
  }

  return module;
});

class Pornsearch {
  constructor (query, driver) {
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
    return this._get(this.module.videoUrl(page), GIF, page || this.module.firstpage);
  }

  _get (url, type, page) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(({ body }) => {
          resolve(this.module[type + PARSER](body));
        })
        .catch((error) => {
          console.log(error);
          reject(`No results for search related to ${this.module.query} in page ${page}`);
        });
    });
  }

  driver (driver = '') {
    this.module = this.modules.find(module => module.name == driver) || {};

    return this;
  }

  load () {
    let dir = Path.resolve('./src/Modules');
    let files = FS.readdirSync(dir, 'UTF-8');

    this.modules = files.map(file => instaceofAbstractModule(new (require(Path.resolve(dir, file)))));

    return this;
  }
};

module.exports = Pornsearch;