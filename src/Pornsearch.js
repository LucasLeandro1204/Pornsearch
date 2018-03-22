import Axios from 'axios';
import Cheerio from 'cheerio';
import Modules from 'Core/Modules';

const GIF = 'gif';
const PARSER = 'Parser';
const VIDEO = 'video';

class Pornsearch {
  constructor (query, driver) {
    this.module = {};
    this.modules = Modules;

    this.driver(query, driver);
  }

  support () {
    return this.modules.map(module => module.name);
  }

  current () {
    return this.module.name;
  }

  get query () {
    return this.module.query || '';
  }

  gifs (page) {
    return this._get(this.module.gifUrl(page), GIF);
  }

  videos (page) {
    return this._get(this.module.videoUrl(page), VIDEO, page || this.module.firstpage);
  }

  _get (url, type, page) {
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then(({ data: body }) => {
          resolve(this.module[type + PARSER](Cheerio.load(body), body));
        })
        .catch((error) => {
          console.warn(error);
          reject(new Error(`No results for search related to ${this.module.query} in page ${page}`));
        });
    });
  }

  driver (query, driver = 'pornhub') {
    const PornModule = this.modules[driver.toLowerCase()];

    if (!PornModule) {
      throw new Error(`We don't support ${driver} by now =/`);
    }

    this.module = new PornModule(query);

    return this;
  }

  static search (query) {
    return new Pornsearch(query);
  }
}

export default Pornsearch;
