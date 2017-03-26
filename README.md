# Pornsearch

Easy way to search for porn content

## Support
Currently supports

[Pornhub](http://pornhub.com/)
## Simple search

```js
const pornsearch = require('pornsearch');
const pornhub = pornsearch.site('pornhub');

pornhub.videos('boobs')
  .then((response) => {
    console.log(response);
  });

pornhub.gifs('pov')
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
If has success, the return will be an array with videos, structured as
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

If has success, the return will be an array with gifs, structured as

```js
{
  title: 'gif title',
  url: 'gif url'
}
```
If has error, will be returned a message like
```Markdown
No results for search related to *relation* in page *page*
```

## Usage

First require Pornsearch
```js
const pornsearch = require('pornsearch');
```
Then pass the website you want to search on (like 'pornhub')
```js
const pornhub = require('pornhub');
```
**An error will be thrown if don't support**

Search for related only

```js
pornhub.videos('boobs')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

pornhub.gifs('pussy')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```
Specify the page number to search on

```js
pornhub.videos('ass', 3);

pornhub.gifs('teta', 7);
```

Get only gifs
```js
pornhub.gifs('teen')
  .then((gifs) => {
    console.log(gifs.map(gif => gif.url));
  });
```