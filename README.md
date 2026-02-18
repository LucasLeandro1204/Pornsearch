# Pornsearch

[![js-semistandard-style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg?style=flat-square)](https://github.com/prettier/prettier)

Easy way to search for porn content

**Note: This library is now written in TypeScript and provides full type definitions!**

#### If you have any suggestions of a website, open an issue!

## Simple search

You can do it in two ways:

**JavaScript (CommonJS):**
```js
const Pornsearch = require('pornsearch');
const Searcher = new Pornsearch('tits');

Searcher.videos()
  .then(videos => console.log(videos));
```

**TypeScript / ES Modules:**
```typescript
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
| [youporn](http://youporn.com/)  |   X    |      |
| [motherless](http://motherless.com/)  |   X    |  X   |


#### Videos structure
What will return in video search

| Site (Module name)              | Title | Url | Thumbnail | Duration |
|:--------------------------------|:-----:|:---:|:---------:|:--------:|
| [pornhub](http://pornhub.com/)  |   X   |  X  |     X     |    X     |
| [sex](http://sex.com/)          |   X   |  X  |     X     |    X     |
| [redtube](https://redtube.com/) |   X   |  X  |     X     |    X     |
| [xvideos](http://xvideos.com/)  |   X   |  X  |     X     |    X     |
| [youporn](http://xvideos.com/)  |   X   |  X  |     X     |    X     |
| [motherless](http://xvideos.com/)  |   X   |  X  |     X     |    X     |

#### Gifs structure
What will return in gif search

| Site (Module name)             | Title | Url | Webm | Thumb |
|:-------------------------------|:-----:|:---:|:----:|:-----:|
| [pornhub](http://pornhub.com/) |   X   |  X  |  X   |       |
| [sex](http://sex.com/)         |   X   |  X  |      |       |
| [motherless](http://motherless.com/) |   X   |  X  |      |   X   |


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

**An error will be thrown if Pornsearch doesn't support the driver you passed in**

### Fluent API

You can also use a fluent API to chain methods:

```js
const searcher = new Pornsearch()
  .setQuery('amateur')
  .driver('sex');

searcher.videos().then(videos => console.log(videos));
```

### Checking Module Capabilities

Check if the current module supports specific content types:

```js
const searcher = new Pornsearch('test', 'redtube');

console.log(searcher.supportsVideos()); // true
console.log(searcher.supportsGifs());   // false
```

To know the current driver
```js
Pornsearch.current();
```

## Search

It's easy to search for porn content with Pornsearch =)

**Check the [support table](#support) to know what you can do**

```js
Pornsearch.videos()
  .then(videos => console.log(videos))
  .then(() => Pornsearch.gifs())
  .then(gifs => console.log(gifs));
```

Specify the page to search on
```js
Pornsearch.gifs(3);
```

Change the query
```js
Pornsearch.setQuery('pussy')
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

If there's an error in any search, a descriptive error will be thrown with helpful information about what went wrong.

## Error Handling

The library provides clear, actionable error messages:

**Query Validation**: Empty or whitespace-only queries will throw an error immediately:
```js
const searcher = new Pornsearch('', 'pornhub');
searcher.videos(); // Error: Search query is required. Please set a query before searching.
```

**Module Support**: Attempting to use unsupported features provides helpful guidance:
```js
const searcher = new Pornsearch('test', 'redtube');
searcher.gifs(); // Error: GIF search is not supported for Redtube. Supported modules with GIF search: sex, pornhub
```

**Network/Parsing Errors**: The library distinguishes between network errors and parsing errors:
- **Parsing errors** (e.g., "Parser not found", "No results found") are preserved and thrown as-is to provide specific diagnostic information
- **Network errors** (connection failures, timeouts, HTTP errors) are wrapped with contextual information:
```js
// Error: Failed to search for "query" on Pornhub (page 1). This could be due to network issues, site changes, or no results being available.
```

Note: As of recent updates, the library validates queries before making network requests, providing faster feedback for invalid inputs.
