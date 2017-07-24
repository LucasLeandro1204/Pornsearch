'use strict';

const AbstractModule = require('./core/AbstractModule');

const Pornsearch = {
  module: {},

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

module.exports = Pornsearch;