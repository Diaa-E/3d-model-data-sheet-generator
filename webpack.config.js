// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? [
    MiniCssExtractPlugin.loader, "css-loader"
]:
[
    "style-loader",
    {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: "__[local]__[hash:base64:5]",
            },
        }
    }
]

const config = {
    entry: {
        app: "./src/App.js",
        index: "./src/Index.js",
        modelForm: "./src/ModelForm.js",
        about: "./src/About.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js",
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ["app", "index"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: true,
            chunks: ["app", "about"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "about.html"
        }),
        new HtmlWebpackPlugin({
            template: './src/model_form.html',
            inject: true,
            chunks: ["app", "modelForm"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "model_form.html"
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: stylesHandler
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    optimization: {
        minimizer: []
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin({filename: "[name].[hash].css"}));
        config.optimization.minimizer.push(new CssMinimizerPlugin());
        config.optimization.minimizer.push(new TerserPlugin());
        config.plugins[0].filename = "[name].[hash].html"; //causes an error when used in dev
        config.output.clean = true;
        
    } else {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
        config.output.clean = true;
    }
    return config;
};
