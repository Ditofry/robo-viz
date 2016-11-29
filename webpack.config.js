module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: './dist'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loaders: ['babel'],
                test: /\.jsx?$/,
            },

            {
                exclude: /node_modules/,
                loaders: [ 'style-loader', 'css-loader', 'postcss-loader', 'css?sourceMap', 'postcss?sourceMap' ],
                test: /\.css$/,
            }
        ],
    },
    postcss: function() {
        return [require('autoprefixer'), require('precss')];
    }
}
