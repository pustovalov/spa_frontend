module.exports = {
  description() {
    return 'Generates a constant';
  },
  fileMapTokens() {
    return {
      __constants__: (options) => {
        return options.settings.getSetting('constantsPath');
      }
    };
  }
};
