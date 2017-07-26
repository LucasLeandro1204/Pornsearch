'use strict';

const AbstractModule = require('./Core/AbstractModule');
const FS             = require('fs');
const Path           = require('path');

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
    return this.module.gifs(page);
  }

  driver (site) {
    try {
      let module = require(`./modules/${site}`);

      if (! module instanceof AbstractModule) {
        throw new Error(`Module should be an instance of Abstract module`);
      }

      this.module = module;
    } catch(error) {
      throw new Error(`Currently we do not support ${site}`);
    }

    return this;
  }

  load () {
    let dir = Path.resolve('./src/Modules');

    FS.readdir(dir, 'UTF-8', (err, files) => {
      if (err) {
        throw new Error(err);
      }

      let a = files.map(file => instaceofAbstractModule(new (require(Path.resolve(dir, file)))));
    });
  }
};

module.exports = Pornsearch;