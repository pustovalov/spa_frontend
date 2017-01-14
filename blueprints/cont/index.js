module.exports = {
  description() {
    return 'Generates a component';
  },
  fileMapTokens() {
    return {
      __containers__: (options) => {
        return options.settings.getSetting('containersPath');
      }
    };
  }
};
