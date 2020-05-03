const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
        new HtmlWebpackPlugin({ templateContent: fs.readFileSync(path.join(__dirname, 'public/index.html')).toString() })
    ],

    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                include: [],
                loader: 'babel-loader'
            },
            {
                test: /.css$/,

                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',

                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [new TerserPlugin()],

        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    },

    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
