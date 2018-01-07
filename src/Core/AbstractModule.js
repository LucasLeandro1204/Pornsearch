class AbstractModule {
  constructor (query = '') {
    this.query = query;
  }

  get name () {
    throw new Error('This function must be overwrite');
  }

  get firstpage () {
    throw new Error('This function must be overwrite');
  }

  static with (...mixins) {
    return mixins.reduce((father, mixin) => mixin(father), this);
  }
}

export default AbstractModule;
