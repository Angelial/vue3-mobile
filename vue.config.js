/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

const autoprefixer = require('autoprefixer')

const postcsspxtorem = require('postcss-pxtorem')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://dev.mojo-java.leapgen.net', // 你要请求的后端接口ip+port
        // http://dev.mojo-java.leapgen.net https://mysteryboxes.mojomojo.net
        // 请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: true,
        pathRewrite: {
          '^/api': '' // 替换成target中的地址
        }
      }
    }
  },
  parallel: false,
  chainWebpack: (config) => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        options = merge(options, {
          happyPackMode: true,
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            // 游览器最近的两个版本
            overrideBrowserslist: ['last 2 versions']
          }),
          postcsspxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
          // pxtoviewport({
          //   viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
          //   minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          //   unitPrecision: 3 // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          // })
        ]
      }
    }
  }
}
