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
  constructor () {
    this.module = {};
    this.modules = [];
    this.load();
  }

  support () {
    return this.modules.map(module => module.name);
  }

  search (query) {
    this.module.query = query;

    return this;
  }

  gifs (page) {
    return this._get(this.module.gifUrl, GIF);
  }

  videos (page) {
    return this._get(this.module.videoUrl, GIF);
  }

  _get (url, type) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(({ body }) => {
          resolve(this.module[type + PARSER](body));
        })
        .catch((error) => {
          console.log(error);
          reject(`No results for search related to ${this.query} in page ${this.page}`);
        });
    });
  }

  driver (site) {
    return this;
  }

  load () {
    let dir = Path.resolve('./src/Modules');
    let files = FS.readdirSync(dir, 'UTF-8');

    this.modules = files.map(file => instaceofAbstractModule(new (require(Path.resolve(dir, file)))));
  }
};

module.exports = Pornsearch;