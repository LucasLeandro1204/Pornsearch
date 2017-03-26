# Pornsearch

Easy way to search for porn content

## Support

### Basic search

| Site                          | Videos | Gif |
|:-----------------------------:|:------:|:---:|
| [Pornhub](http://pornhub.com/) | [X]   | [X] |
| [xVideos](http://xvideos.com/) | [X]   |     |

### Videos structure
What will return in video search

| Site                          | URL | Thumbnail | Duration |
|:-----------------------------:|:---:|:---------:|:--------:|
| [Pornhub](http://pornhub.com/) |[X] | [X]       | [X]      | 
| [xVideos](http://xvideos.com/) |[X] | [X]       | [X]      |

### Gifs structure
What will return in gif search

| Site                          | URL | WEBM |
|:-----------------------------:|:---:|:----:|
| [Pornhub](http://pornhub.com/) |[X] | [X]  |


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

__Gifs in general are extremely heavy, so be a nice person and share webm__

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