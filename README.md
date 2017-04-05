# Pornsearch

Easy way to search for porn content

#### If you have any suggestions of a website, open an issue!

## Simple search

```js
const pornsearch = require('pornsearch');
const pornhub = pornsearch.load('pornhub');

pornhub.videos('boobs')
  .then((response) => {
    console.log(response);
  });

pornhub.gifs('pov')
  .then((response) => {
    console.log(response);
  });
```
## Support

#### Basic search

| Site - Module name             | Videos | Gifs |
|:-------------------------------|:------:|:----:|
| [pornhub](http://pornhub.com/)  | X     | X    |  
| [sex](http://sex.com/)          | X     | X    |
| [redtube](https://redtube.com/) | X     |      |
| [xvideos](http://xvideos.com/)  | X     |      |


#### Videos structure
What will return in video search

| Site - Module name             | URL | Thumbnail | Duration |
|:-------------------------------|:---:|:---------:|:--------:|
| [pornhub](http://pornhub.com/)  | X  | X         | X        | 
| [sex](http://sex.com/)          | X  | X         | X        |
| [redtube](https://redtube.com/) | X  | X         | X        |
| [xvideos](http://xvideos.com/)  | X  | X         | X        |

#### Gifs structure
What will return in gif search

| Site - Module name             | URL | WEBM |
|:-------------------------------|:---:|:----:|
| [pornhub](http://pornhub.com/) | X   | X    |
| [sex](http://sex.com/)         | X   |      |

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

#### Videos
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

**Check the support table to know exactly what will be returned**

#### Gifs

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

**Check the support table to know exactly what will be returned**

## Usage

First require Pornsearch
```js
const pornsearch = require('pornsearch');
```
Then pass the website you want to search on (like 'pornhub')
```js
const pornhub = require('pornhub');
```
**Check the [support table](#support) to know what you can do**

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