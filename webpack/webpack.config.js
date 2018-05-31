var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../client/');

module.exports = {
    entry: [
        path.join(parentDir, './index.jsx')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|otf|eot|svg|ttf|woff)$/i,
                use: [
                'url-loader?limit=100000',
                'img-loader'
                ]
            }
        ]
    },
    output: {
        path: parentDir + '../dist/client/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}