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

  videoUrl () {
    throw new Error(`${this.name} doesn't support video search`);
  }

  gifUrl () {
    throw new Error(`${this.name} doesn't support gif search`);
  }

  videoParser () {
    throw new Error('This function must be overwrite');
  }

  gifParser () {
    throw new Error('This function must be overwrite');
  }

  static extendsToMe (module) {
    if (!(module instanceof this)) {
      throw new Error(`Module should be an instance of Abstract module`);
    }

    return module;
  }
}

export default AbstractModule;
