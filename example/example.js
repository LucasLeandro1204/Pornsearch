'use strict';

const pornsearch = require('../lib/pornsearch');

pornsearch.videos('boobs')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });