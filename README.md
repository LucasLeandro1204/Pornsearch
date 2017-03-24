# Pornsearch

Easy way to search for porn content on [Pornhub](http://pornhub.com/)
  
## Simple search

```js
const pornsearch = require('../lib/pornsearch');

pornsearch.videos('boobs')
  .then((response) => {
    console.log(response);
  });

pornsearch.gifs('pov')
  .then((response) => {
    console.log(response);
  });
```

## Installation

Via GIT:
```bash
$ git clone git://github.com/LucasLeandro1204/api.git node_modules/pornsearch
```
Via NPM:
```bash
$ npm install pornsearch
```

## Output

### Videos
If has success, the return will be an array with ~~possibly less than~~ 20 videos, structured as
```js
{
  title: 'video title',
  url: 'video url',
  duration: 'video duration',
  thumb: 'video thumbnail'
}
```
If has error, will be returned a message like
```Markdown
No results for search related to *relation* in page *page* and category number *number*
```

### Gifs

If has success, the return will be an array with ~~possibly less than~~ 34 gifs, structured as

__Gifs from Pornhub are extremely heavy, so be a nice person and share webm__
```js
{
  title: 'gif title',
  url: 'gif url',
  webm: 'gif webm url'
}
```
If has error, will be returned a message like
```Markdown
No results for search related to *relation* in page *page*
```

## Usage

First require Pornsearch
```js
const pornsearch = require('../lib/pornsearch');
```
Search for related only

```js
pornsearch.videos('boobs')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

pornsearch.gifs('pussy')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```
Specify the page number to search on

```js
pornsearch.videos('ass', 3);

pornsearch.gifs('teta', 7);
```
You can too search by category number (look at Pornhub and search through for it) *Video only*

```js
pornsearch.videos('young', 5, 41);
```

Get only webm
```js
pornsearch.gifs('teen')
  .then((gifs) => {
    console.log(gifs.map(gif => gif.webm));
  });
```

### To do

- [X] Search for GIF