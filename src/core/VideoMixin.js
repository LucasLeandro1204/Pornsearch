import OverwriteError from 'core/OverwriteError';

export default Father => class extends Father {
  videoUrl () {
    throw new OverwriteError;
  }

  videoParser () {
    throw new OverwriteError;
  }
};
