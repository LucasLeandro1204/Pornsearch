'use strict';

const Pornsearch = require('../').search('tits');

Pornsearch.driver('sex').gifs()
  .then((gifs) => {
    console.log(gifs);

    return Pornsearch.videos();
  })
  .then(videos => console.log(videos));
