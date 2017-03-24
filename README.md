#Pornsearch
Easy way to search for porn content on the [Pornhub](http://pornhub.com/)
  
##Simple search
```js
const pornsearch = require('../lib/pornsearch');

pornsearch.videos('boobs')
  .then((response) => {
    console.log(response);
  });
```

##Installation
Via GIT:
```bash
$ git clone git://github.com/LucasLeandro1204/api.git node_modules/pornsearch
```
Via NPM:
```bash
$ npm install pornsearch
```

##Output
If has success, the return will be an array with ~~possibly less than~~ 20 videos, structured as
```js
{
  title: 'video title',
  url: 'video url',
  thumb: 'video thumbnail'
}
```
If has error, will be returned a message like
```Markdown
No results for search related to *relation* in page *page* and category number *number*
```

##Usage
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
```
Specify the page number to search on

```js
pornsearch.videos('ass', 3);
```
You can too search by category number (look at Pornhub and search through for it)

```js
pornsearch.videos('young', 5, 41);
```

###To do

- [ ] Search for GIF