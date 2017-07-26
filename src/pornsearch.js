'use strict';

const AbstractModule = require('./core/AbstractModule');
const FS             = require('fs');
const Path           = require('path');

const Pornsearch = {
  module: {},
  modules: {},

  init () {
    let dir = Path.resolve('./src/modules');

    FS.readdir(dir, 'UTF-8', (err, files) => {
      if (err) {
        throw new Error(err);
      }

      this.modules = files.map(file => require(Path.resolve(dir, file)));
    });

    return this;
  },

  search (query) {
    this.module.query = query;

    return this;
  },

  gifs (page) {
    return this.module.gifs(page);
  },

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
};

module.exports = Pornsearch.init();