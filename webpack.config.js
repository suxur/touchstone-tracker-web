const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve('resources/js'),
    },
  },
  stats: {
    children: true,
  }
};
