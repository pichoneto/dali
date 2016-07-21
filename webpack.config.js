var webpack = require('webpack');

module.exports = {
    entry: [
        'bootstrap-loader', //Loads Twitter Bootstrap
        './index.jsx'

    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader?presets[]=es2015,presets[]=react',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000' },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader' },/*
            {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery!expose?$!expose?window.jQuery'  //expose-loader, exposes as global variable
            }*/
            {
                test: require.resolve('jszip'),
                loader: 'expose?JSZip'
            },
            {
                test: require.resolve('jszip-utils'),
                loader: 'expose?JSZipUtils'
            },
            {
                test: require.resolve('file-saver'),
                loader: 'expose?FileSaver'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"production"'
          }
        }),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/', //This is used to generate URLs to e.g. images
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
};


//En terminal aparte añadir sass --watch sass/style.scss:dist/css/compiledsass.css

