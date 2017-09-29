'use strict';

const Pornsearch = require('../src/Pornsearch').search('amateur');

Pornsearch.driver('sex').gifs()
  .then(gifs => {
    console.log(gifs);

    return Pornsearch.videos();
  })
  .then(videos => console.log(videos));
