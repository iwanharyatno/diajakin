const path = require('path')

export default {
  resolve: {
    alias: {
        '~bootstrap': path.resolve(__dirname, "node_modules/bootstrap"),
    }
  },
  build: {
    lib: {
        entry: path.resolve(__dirname, 'src/main.js'),
        name: 'diajakin',
        fileName: 'diajakin'
    }
  },
  publicDir: 'assets'
}