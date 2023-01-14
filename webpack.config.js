const HtmlWebpackPlugin = require("html-webpack-plugin")

const prod = process.env.NODE_ENV == "production"

module.exports = {
	mode: prod ? "production" : "development",
	entry: "./src/index.tsx",
	output: {
		path: __dirname + "/dist/"
	},
	module: {
    	rules: [
		  	{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				resolve: {
			  		extensions: [".ts", ".tsx"],
				},
				use: "ts-loader",
		  	}
		]
	},
 	plugins: [
		new HtmlWebpackPlugin({title: "Inheritance Protocol"})
    ]
}
