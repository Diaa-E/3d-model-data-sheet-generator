// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production';
const repoName = {
    base: '/3d-model-data-sheet-generator/',
    publicPath: '/3d-model-data-sheet-generator/'
};

const stylesHandler = isProduction ? [ MiniCssExtractPlugin.loader ]:[ "style-loader" ];

stylesHandler.push(
    {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: "__[local]__[hash:base64:5]",
            },
        }
    }
);

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
        clean: true,
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: isProduction ? [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ["app", "index"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "index.html",
            title: "Home | 3D Model Datasheet Generator",
            ...repoName
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ["app", "about"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "about.html",
            title: "About | 3D Model Datasheet Generator",
            ...repoName
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ["app", "modelForm"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "model_form.html",
            title: "3D Model | 3D Model Datasheet Generator",
            ...repoName
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ] : [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ["app", "index"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "index.html",
            title: "Home | 3D Model Datasheet Generator",
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ["app", "about"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "about.html",
            title: "About | 3D Model Datasheet Generator",
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ["app", "modelForm"],
            favicon: "./src/assets/logo/logo.svg",
            filename: "model_form.html",
            title: "3D Model | 3D Model Datasheet Generator",
        }),  
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
        
    } else {
        config.mode = 'development';

        config.devtool = 'inline-source-map';
    }
    return config;
};
