import OverwriteError from 'core/OverwriteError';

export default Father => class extends Father {
  gifUrl () {
    throw new OverwriteError;
  }

  gifParser () {
    throw new OverwriteError;
  }
};
