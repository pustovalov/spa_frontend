module.exports = {
  description() {
    return 'Generates a reducer';
  },
  fileMapTokens() {
    return {
      __reducers__: (options) => {
        return options.settings.getSetting('reducersPath');
      }
    };
  }
};
