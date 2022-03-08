const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const name = '前端模板'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
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
  }
})
