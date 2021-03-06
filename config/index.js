// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port:8023,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/upload':'http://192.168.0.9:8080//imageBase',

      '/findcart':'http://192.168.0.17:8080/fresh-order/cart',//购物车
      '/order':'http://192.168.0.17:8080/fresh-order',//订单

      '/gc':'http://192.168.0.12:8080',//商品分类
      '/goods':'http://192.168.0.12:8080',//商品
      '/store':'http://192.168.0.12:8080',//商铺
      '/brand':'http://192.168.0.12:8080',//品牌
      '/comment':'http://192.168.0.12:8080',//商品评论
      '/goodsStock':'http://192.168.0.12:8080',//库存
      '/attrGoods':'http://192.168.0.12:8080',//编辑待审核

      '/adv':'http://192.168.0.9:8080',//首页banner广告
      '/floor':'http://192.168.0.9:8080',//首页楼层
      '/goodsStock':'http://192.168.0.12:8080'//库存

      
  },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
