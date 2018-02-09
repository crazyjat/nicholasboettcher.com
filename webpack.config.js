var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LessPluginAutoPrefix = require("less-plugin-autoprefix"),
    autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

const dist = path.resolve(__dirname, "public");

module.exports = {
    entry: [
        "babel-polyfill",
        path.resolve(__dirname, "src/bootstrap.js"),
    ],
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: dist,
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "src/app/"),
            "node_modules",
        ],
    },
    devServer: {
        inline: true,
        hot: true,
        port: 8080,
        host: "0.0.0.0",
        public: "vserver:8080",
        historyApiFallback: true,
        contentBase: dist,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [ "env" ],
                    },
                },
            },
            /*{
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: "text-loader",
                },
            },*/
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: "html-loader",
                },
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                        }, 
                        {
                            loader: "less-loader",
                            options: {
                                relativeUrls: true,
                                plugins: [
                                    autoprefixPlugin
                                ]
                            },
                        },
                    ],
                    fallback: "style-loader",
                }),
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|otf)$/,
                loader: "file-loader",
                options: {
                    limit: 64000, // Convert fonts < 64kb to base64 strings
                    name: "[name].[ext]",
                    outputPath: "fonts/",
                },
            },
            {
                test: /\.(png|jp(e*)g)$/,  
                loader: "url-loader",
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: "[name].[ext]",
                    outputPath: "images/",
                }
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            //filename: "[name].[contenthash].css",
        }),
        new HtmlWebpackPlugin({
            xhtml: true,
            inject: "head",
            template: path.resolve(__dirname, "src/index.html"),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf("node_modules") >= 0;
            },
        }),
    ],
};