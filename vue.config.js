// vue.config.js
const StylelintPlugin = require('stylelint-webpack-plugin');

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 module.exports = {
    chainWebpack(config) {
        // Set up all the aliases we use in our app.
        config.resolve.alias.clear().merge(require('./aliases.config'));
    },
    configureWebpack: {
      plugins: [
        new StylelintPlugin({
          files: 'src/**/*.{vue,scss}',
        }),
      ],
    }

  }