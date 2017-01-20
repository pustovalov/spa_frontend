module.exports = {
  description() {
    return 'Generates a component';
  },
  fileMapTokens() {
    return {
      __components__: (options) => {
        return options.settings.getSetting('componentsPath');
      }
    };
  }
};
