// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// gzip压缩
// const CompressionWebpackPlugin = require("compression-webpack-plugin");

// 本地环境是否需要使用cdn
const devNeedCdn = true;

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  //"模块文件名":"引入变量名"
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    vuetify: "vuetify",
    axios: "axios",
    // "ant-design-vue": "antd",
  },
  // cdn的css链接
  css: [
    // "https://cdn.bootcdn.net/ajax/libs/antd/3.26.20/antd.css",
    "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css",
    // "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.7.1/antd.min.css",
  ],
  // cdn的js链接
  js: [
    "https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js",
    "https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js",
    "https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js",
    "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js",
    /////////////////////////////////////////////////////////////////////////
    // ==================   Vuex  && ant-vue CDN  ========================//
    // "https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js",
    // "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.7.1/antd.min.js",
    /////////////////////////////////////////////////////////////////////////
  ],
};

module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  chainWebpack: (config) => {
    // // ============压缩图片 start============
    // config.module
    //     .rule('images')
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({ bypassOnDebug: true })
    //     .end()
    // ============压缩图片 end============

    // ============注入cdn start============
    config.plugin("html").tap((args) => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      return args;
    });
    // ============注入cdn start============
  },
  configureWebpack: (config) => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals;

    // 生产环境相关配置
    // if (isProduction) {
    //   // 代码压缩
    //   // ..................
    //   // gzip压缩
    //   const productionGzipExtensions = ["html", "js", "css"];
    //   config.plugins.push(
    //     new CompressionWebpackPlugin({
    //       filename: "[path].gz[query]",
    //       algorithm: "gzip",
    //       test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
    //       threshold: 10240, // 只有大小大于该值的资源会被处理 10240
    //       minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //       deleteOriginalAssets: false, // 删除原文件
    //     })
    //   );
    // }

    // 公共代码抽离
    // config.optimization = {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         chunks: "all",
    //         test: /node_modules/,
    //         name: "vendor",
    //         minChunks: 1,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 100,
    //       },
    //       common: {
    //         chunks: "all",
    //         test: /[\\/]src[\\/]js[\\/]/,
    //         name: "common",
    //         minChunks: 2,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 60,
    //       },
    //       styles: {
    //         name: "styles",
    //         test: /\.(sa|sc|c)ss$/,
    //         chunks: "all",
    //         enforce: true,
    //       },
    //       runtimeChunk: {
    //         name: "manifest",
    //       },
    //     },
    //   },

    // };
  },
};
