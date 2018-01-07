export default (Father) => class extends Father {
  videoUrl () {
    throw new Error('This function must be overwrite');
  }

  videoParser () {
    throw new Error('This function must be overwrite');
  }
};
