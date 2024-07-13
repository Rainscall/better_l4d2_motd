const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BuildInfoPlugin = require('build-info-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        server: 'https',
    },
    entry: {
        app: ['babel-polyfill', './src/entry.js']
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-normalize',
                                    'autoprefixer',
                                    'postcss-preset-env'
                                ],
                            },
                        },
                    },
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(jpg|png|gif)$/,
                type: 'asset/resource'
            },
        ]
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all', // 可选值：all，async 和 initial。
            maxInitialRequests: Infinity,
            minSize: 128 * 1024,
            maxSize: 512 * 1024 * 1024,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                        return `npm.${packageName.replace('@', '')}`
                    },
                },
            },
        }
    },
    output: {
        filename: '[name].[fullhash].bundle.js',
        clean: true,
        path: path.resolve(__dirname, "dist"),
        environment: {
            arrowFunction: false
        }
    },
    target: ['web', 'es5'],
    plugins: [
        new HtmlWebpackPlugin({
            template: './template/index.html',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './template/404.html',
            filename: '404.html',
            inject: false,
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
        }),
        BuildInfoPlugin
    ],
}