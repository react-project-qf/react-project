var HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
	entry: './src/script/app.js',
	output: {
		path: __dirname + '/build',
		filename: 'app_[hash].js'
	},
	devServer: {
		contentBase: './build',
		host: 'localhost',
		port: 9000,
		historyApiFallback: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
			title: '豆瓣电影',
		})
	]
}