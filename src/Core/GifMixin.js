export default (Father) => class extends Father {
  gifUrl () {
    throw new Error('This function must be overwrite');
  }

  gifParser () {
    throw new Error('This function must be overwrite');
  }
};
