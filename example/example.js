'use strict';

const Pornsearch = require('../').default;
const PornDriver = Pornsearch.search('amateur');

PornDriver.driver('sex').gifs()
  .then((gifs) => {
    console.log(gifs);

    return PornDriver.videos();
  })
  .then(videos => console.log(videos));
