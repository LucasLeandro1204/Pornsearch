import OverwriteError from 'core/OverwriteError';

class AbstractModule {
  constructor (query = '') {
    this.query = query;
  }

  get name () {
    throw new OverwriteError;
  }

  get firstpage () {
    throw new OverwriteError;
  }

  static with (...mixins) {
    return mixins.reduce((father, mixin) => mixin(father), this);
  }
}

export default AbstractModule;
