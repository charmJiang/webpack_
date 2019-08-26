let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 压缩css
let MiniCssExtracPlugin = require('mini-css-extract-plugin')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')




module.exports = {
    optimization: { // 优化项 压缩css 但是用了这个插件之后必须使用
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    devServer: { // 开发服务的配置
        port: 9000,
        progress: true, // 打包的进度条
        contentBase: './dist', //以dist为静态服务
        compress: true, // 压缩
    },
    mode: 'production', // 模式 默认有两种 production development
    entry: './src/index.js', // 入口
    output: {
        path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
        filename: 'bundle.[hash:8].js', // 打包后的文件名, 给文件添加hash，防止缓存 8 只显示8位置
        publicPath: 'http://cdn/ ', //会给资源添加一个前缀cdn
    },
    plugins: [ // 数组，放着所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模版
            filename: 'index.html',  //打包后的文件名字
            minify: {
                removeAttributeQuotes: true, //移除双引号
                collapseWhitespace: true, //折叠空行
            },
            hash: true, // 给index.html模版插入的文件文件添加hash戳
        }),
        new MiniCssExtracPlugin({
            filename: 'css/index.css', //抽离出来的css名字

        })
    ],
    module: { // 模块
        rules: [ 
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { //用babel-loader 需要把es6 - es5
                        presets: [
                         '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            
            // 规则 css-loader 处理css(文件比如：@import ‘./a.css')
            // style-loader 把css插入到head的标签中
            // loader的特点， 希望单一
            // loader 的用法 字符串只用一个loader
            // 多个loader需要 []
            // loader 的顺序 默认是从右向左执行
            // loader 还可以写成对象方式
            // 要从js中去引用css
            {
                // 可以处理less文件

                test: /\.css$/, 
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         // insertAt: 'top', //插入到style标签顶部
                            

                    //     }
                    // },
                    MiniCssExtracPlugin.loader, // link标签插入模版 index.html
                    'css-loader',   // 注意顺序
                    'postcss-loader'// 添加浏览器前缀
                ]
            },
            {
                test: /\.scss$/, 
                use: [
                    {
                        loader: 'style-loader',
                    },
                    'css-loader', // @import 解析路径
                    'postcss-loader', // 添加浏览器前缀
                    'sass-loader' // 把scss -> css
                ]
            }
        ]

    }
}