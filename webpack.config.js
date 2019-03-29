const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader',
            },
        ],
    },
    devServer: {
        contentBase: './dist'
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            Utils: path.resolve(__dirname, 'src/utils'),
        }
    },
}