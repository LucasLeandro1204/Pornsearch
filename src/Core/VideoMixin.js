import OverwriteError from 'Core/OverwriteError';

export default (Father) => class extends Father {
  videoUrl () {
    throw new OverwriteError;
  }

  videoParser () {
    throw new OverwriteError;
  }
};
