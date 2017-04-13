'use strict';

const pornsearch = require('../');
const pornhub = pornsearch.load('pornhub');

pornhub.videos('boobs')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });