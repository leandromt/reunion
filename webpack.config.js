// webpack.config.js

const path 					= require('path');
const ExtractTextPlugin 	= require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'app.js'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				"style-loader", // creates style nodes from JS strings
				"css-loader", // translates CSS into CommonJS
				"sass-loader" // compiles Sass to CSS
            ]
			//use: ['css-loader', 'sass-loader']
			// use: ExtractTextPlugin.extract({
			// 	fallback: 'style-loader',
			// 	use: [{
			// 		loader: 'css-loader',
			// 		options: {
			// 			// If you are having trouble with urls not resolving add this setting.
			// 			// See https://github.com/webpack-contrib/css-loader#url
			// 			sourceMap: false,
			// 			discardComments: { removeAll: true }
			// 		}
			// 	}, 
			// 	{
			// 		loader: 'sass-loader',
			// 		options: {
			// 			sourceMap: false,
			// 			discardComments: { removeAll: true }
			// 		}
			// 	}]
			// })
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			ignoreOrder: false,
			filename: 'style.css'
		})
	]
};