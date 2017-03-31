var webpack = require('webpack');

//html插件ejs
var HtmlWebpackPlugin = require("html-webpack-plugin");
//抽离文本
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
module.exports = {
	entry: './src/script/app.js',
	output: {
		path: __dirname + '/build',
		// filename: 'app_[hash].js'
		filename: 'app.js'
	},
	devServer: {
		contentBase: './build',
		host: 'localhost',
		port: 9000,
		historyApiFallback: false,
		proxy: {
			'/api': {
				target: "http://m.leyou.com.cn",
				pathRewrite: {
					'^/api': '',
				},
				changeOrigin: true
			}
		}
	},
	module: {
		loaders: [
			// {
			// 	test: /\.css$/,
			// 	loader: 'style-loader!css-loader'
			// }, {
			// 	test: /\.scss$/,
			// 	loader: 'style-loader!css-loader!sass-loader'
			// },
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!sass-loader'
				})
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'react-hot-loader!babel-loader'
			}
		]
	},
	plugins: [
		// 压缩js
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	},
		// 	output: {
		// 		comments: false
		// 	}
		// }),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
			// css压缩
			// minify: {
      //   "removeAttributeQuotes": true,
      //   "removeComments": true,
      //   "removeEmptyAttributes": true,
	    // },

			title: '乐友商城'
		}),
		new ExtractTextPlugin({
			// filename: 'app_[hash].css',
			filename: 'app.css',
			disable: false,
			allChunks: true
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:9000'
		})
	],
	externals: {
		'react': 'window.React',
		'react-dom': 'window.ReactDOM',
		'react-router': 'window.ReactRouter',
		'react-redux': 'window.ReactRedux',
		'redux': 'window.Redux',
		'jquery': 'window.jQuery'
	}
}
