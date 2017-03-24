var HtmlWebpackPlugin = require('html-webpack-plugin')

modile.exports = {
	entry: './src/script/app.js',

	output: {
		path: __dirname + '/build'
		filename: 'app_[hash].js',

	},
	devServer: {
		contentBase: './bulid',
		host: 'localhost',
		port: 9000,
		historyApiFallback: false

	}
}