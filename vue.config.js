const CompressionPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  lintOnSave: false,
  outputDir: process.env.outputDir,
  productionSourceMap: false,
  chainWebpack: config => {
    if (isProduction) {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      }
      // 移除路由预加载
      config.plugins.delete('prefetch')

      // 多次引用组件提取单独文件
      config.optimization.splitChunks({
        minChunks: 2
      })
    }
  },
  // 开启gzip压缩
  configureWebpack: () => {
    if (isProduction) {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
}
