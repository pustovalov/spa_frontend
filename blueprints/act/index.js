module.exports = {
  description() {
    return 'Generates an action';
  },
  fileMapTokens() {
    return {
      __actions__: (options) => {
        return options.settings.getSetting('actionsPath');
      }
    };
  }
};
