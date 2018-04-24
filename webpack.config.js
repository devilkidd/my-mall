//引入webpack,用于插件CommonsChunkPlugin
var webpack = require('webpack');
//为output的path.resolve()方法,定义path
// var path = require('path');
//引入css单独打包插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//引入html模版处理插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置,dev/online模式
//process nodejs中的一个对象
//||'dev'容错,默认使用dev
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        // filename: name + '.html',
        // favicon:'./favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}
//webpack config 开始
var config = {
    entry: {
        //common是通用模块,所以webpack-dev-server/client会随之打包到每个页面
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'result': ['./src/page/result/index.js'],

    },
    output: {
        path:__dirname+'/dist/',
        // path: path.resolve(__dirname, '/dist/'),
        //另一种写法,比较异同
        // path: './dist',
        //一行代码解决不能热更新问题        
        publicPath:'/dist/',
        // publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymall.com/mmall-fe/dist/',        
        //[name].js输出文件,命名为入口配置的名字
        filename: 'js/[name].js'
    },
    plugins: [
        //配置插件CommonsChunkPlugin,独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //配置插件extract-text-webpack-plugin,css单独打包
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')), new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    ],
    resolve: {
        //配置别名
        alias: {
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            view: __dirname + '/src/view',
            image: __dirname + '/src/image',
            node_modules: __dirname + '/node_modules',
        }
    },
    module: {
        loaders: [
            // /\.css$/正则表示以css结尾的文件
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            {
                test: /\.string$/,
                loader: 'html-loader',
                query:{
                    minimize:true,//加载文件时最小化压缩
                    removeAttributeQuotes:false //不删除属性上的引号
                }
            },

        ]
    }
};
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
//webpack config 结束


module.exports = config;