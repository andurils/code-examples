const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js'], // Entry descriptor  传入一个对象 ./src/index.js
  },
  output: {
    path: path.resolve(process.cwd(), './lib'), // 绝对路径
    publicPath: '/dist/', // 相对于服务(server-relative)
    filename: 'me-vue-ui.common.js',
    chunkFilename: '[id].js',
    // libraryTarget: 'commonjs2',
    library: {
      // name: 'MEVUE', // 库的名称
      type: 'commonjs2', //配置将库暴露的方式
      export: 'default', // 指定哪一个导出应该被暴露为一个库
    },
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules'],
  },
  // externals: config.externals, //外部扩展
  performance: {
    // 控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
    hints: false, // 不展示警告或错误提示
  },
  // 可以在统计输出里指定你想看到的信息
  stats: {
    children: false, // 是否添加关于子模块的信息
  },
  optimization: {
    //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()],
};
