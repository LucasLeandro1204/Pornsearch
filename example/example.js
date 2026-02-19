'use strict';

const Pornsearch = require('../dist/Pornsearch');
const PornDriver = Pornsearch.search('amateur');

PornDriver.driver('pornhub')
  .gifs()
  .then((gifs) => {
    console.log(gifs);

    return PornDriver.videos();
  })
  .then((videos) => console.log(videos));
