'use strict';

const Pornsearch = require('../').search();

Pornsearch.driver('sex').gifs()
  .then((gifs) => {
    console.log(gifs);

    return Pornsearch.videos();
  })
  .then(videos => console.log(videos));
