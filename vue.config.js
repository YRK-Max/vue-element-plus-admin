const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const name = '前端模板'

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8088

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@comp': resolve('src/components')
      }
    }
  },
  devServer: {
    port: port,
    proxy: {
      '/server': {
        target: 'https://d1882834-cda9-4be4-a47e-acfd5b0ed28e.mock.pstmn.io',
        ws: false,
        changeOrigin: true
      }
    }
  }
})
