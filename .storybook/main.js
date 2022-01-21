const path = require('path');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../resources/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  core: {
    builder: "webpack5"
  },
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        roots: [path.resolve(__dirname, '../public'), 'node_modules'],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          '@': path.resolve(__dirname, '../resources/js'),
        },
      }
    };
  }
};
