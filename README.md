# Pornsearch

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Easy way to search for porn content

#### If you have any suggestions of a website, open an issue!

## Simple search

You can do it in two ways:

```js
const Pornsearch = require('pornsearch');
const Searcher = new Pornsearch('tits');

Searcher.videos()
  .then(videos => console.log(videos));
```

```js
// using import
import Pornsearch from 'pornsearch';

const Searcher = new Pornsearch('tits');

Searcher.videos()
  .then(videos => console.log(videos));
```

or (my favourite)

```js
const Pornsearch = require('pornsearch').search('ass');

Pornsearch.gifs()
  .then(gifs => console.log(gifs));
```

## Support

#### Basic search

| Site (Module name)              | Videos | Gifs |
|:--------------------------------|:------:|:----:|
| [pornhub](http://pornhub.com/)  |   X    |  X   |
| [sex](http://sex.com/)          |   X    |  X   |
| [redtube](https://redtube.com/) |   X    |      |
| [xvideos](http://xvideos.com/)  |   X    |      |


#### Videos structure
What will return in video search

| Site (Module name)              | Title | Url | Thumbnail | Duration |
|:--------------------------------|:-----:|:---:|:---------:|:--------:|
| [pornhub](http://pornhub.com/)  |   X   |  X  |     X     |    X     |
| [sex](http://sex.com/)          |   X   |  X  |     X     |    X     |
| [redtube](https://redtube.com/) |   X   |  X  |     X     |    X     |
| [xvideos](http://xvideos.com/)  |   X   |  X  |     X     |    X     |

#### Gifs structure
What will return in gif search

| Site (Module name)             | Title | Url | Webm |
|:-------------------------------|:-----:|:---:|:----:|
| [pornhub](http://pornhub.com/) |   X   |  X  |  X   |
| [sex](http://sex.com/)         |   X   |  X  |      |

## Installation

Via NPM:
```bash
$ npm install pornsearch
```

Via GIT:
```bash
$ git clone git://github.com/LucasLeandro1204/api.git node_modules/pornsearch
```

## Usage

There's two ways to use Pornsearch:

You can create a new instance with two parameters: the first one is the query, what you want to search, the second one is the driver (Pornhub default).

```js
const Pornsearch = require('pornsearch');
const Searcher = new Pornsearch(query, driver = 'pornhub');
```

```js
// Using import
import Pornsearch from 'pornsearch';

const Searcher = new Pornsearch(query, driver = 'pornhub');
```

Or you can use the static search method, but you can pass only the query, the driver will be pornhub.

```js
const Pornsearch = require('pornsearch').search(query);
```

But you always can change the current driver:
```js
Pornsearch.driver(driver);
```

**An error will be thrown if Pornsearch don't support the driver you passed in**

To know the current driver
```js
Pornsearch.current();
```

## Search

It's easy to search for porn content with Pornsearch =)

**Check the [support table](#support) to know what you can do**

```js
Pornsearch.videos()
  .then(videos => console.log(videos)
  .then(() => Pornsearch.gifs())
  .then(gifs => console.log(gifs));
```

Specify the page to search on
```js
Pornsearch.gifs(3);
```

Change de query
```js
Pornsearch.search('pussy')
  .gifs()
  .then(gifs => console.log(gifs));
```

Log only url
```js
Pornsearch.gifs(3)
  .then(gifs => console.log(gifs.map(gif => gif.url)));
```

## Output

#### Videos

To know what the current driver will return in video search check the [videos structure](#videos-structure)

#### Gifs

To know what the current driver will return in gif search check the [gifs structure](#gifs-structure)

__PORNHUB gifs in general are extremely heavy, so be a nice person and share webm__ (sex.com gifs are nice)

If has error in whenever search, will be throw an error:
```Markdown
No results for search related to *query* in page *page*
```
