const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
// const glob = require('glob');
const glob = require('glob-all')
const PurifyCSSPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
  },
  output: {
    // publicPath: __dirname + "/dist/", // js引用路径或者CDN地址
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:7].bundle.js",
    chunkFilename: "[name]-[hash:7].chunk.js"
  },
  mode: "development", // 开发模式
  devtool: "source-map", // 开启调试
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000, // 本地服务器端口号
    hot: true, // 热重载
    overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
    // proxy: {
    //   // 跨域代理转发
    //   "/api": {
    //     target: "http://",
    //     changeOrigin: true,
    //     logLevel: "debug",
    //     headers: {
    //       Cookie: ""
    //     }
    //   }
    // },
    before: function (app, server) {
      app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{ from: /.*/, to: "/index.html" }]
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, //在这个数以下转成base64代替图片  size <= 20KB
          name: 'image/[name].[hash:7].[ext]',
          publicPath: "static/",
          outputPath: "static/"

        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
          publicPath: "static/",
          outputPath: "static/"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
          publicPath: "static/",
          outputPath: "static/"
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      _isArray: "lodash-es/isArray",
      $: "jquery"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ["app"], // entry中的app入口才会被打包
      // hash: true, //如果webpack为所有包含的脚本和CSS文件附加唯一的编译哈希。这对缓存清除很有用
      // minify: {
      //   // 压缩选项
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   useShortDoctype: true
      // }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new MiniCssExtractPlugin(),
    // new PurifyCSSPlugin({
    //   paths: glob.sync([
    //     // 要做CSS Tree Shaking的路径文件
    //     path.resolve(__dirname, 'dist/*.html'),
    //     path.resolve(__dirname, "demo3/*.js")
    //     // 在实际开发中一定存在js插入HTML文件结构的情况，这时候如果只配置作用的html文件是肯定不能监听到js中添加的html结构
    //     // path.join(__dirname, './src/*.js')
    //   ])
    // }),

  ]
};
