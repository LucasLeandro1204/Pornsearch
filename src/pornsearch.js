'use strict';

const Pornsearch = {

  load(site) {
    try {
      return require(`./modules/${site}`);
    } catch(error) {
      throw new Error(`Currently we do not support ${site}`);
    }
  }
};

module.exports = Pornsearch;