/* eslint-disable no-underscore-dangle */
const path = require('path');
const glob = require('glob');

const resolve = (dir) => path.join(__dirname, dir);

// for multiple page entries
const getPagesEntry = () => {
  const entry = {};
  const fileNameArr = glob.sync(path.join(__dirname, './src/pages/**/*.html'))
    .map((p) => p.split('/src/pages/')[1]).map((p) => p.replace('.html', ''));

  fileNameArr.forEach((e) => {
    const tmp = e.split('/');

    if (tmp.length > 1) {
      const _path = tmp[0];
      const _file = tmp[1];

      entry[e] = {
        entry: `./src/entry/${_path}/${_file}.js`,
        template: `./src/pages/${_path}/${_file}.html`,
        filename: `${_path}/${_file}.html`,
        chunks: ['chunk-vendors', 'chunk-common', e],
      }
    } else {
      const t = tmp[0];
      entry[t] = {
        entry: `./src/entry/${t}.js`,
        template: `./src/pages/${t}.html`,
        filename: `${t}.html`,
        chunks: ['chunk-vendors', 'chunk-common', t],
      }
    }
  })

  return entry;
};

module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  pages: getPagesEntry(),
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js',
        '@': resolve('src')
      }
    },
  }
};
