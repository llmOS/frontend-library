const webpack = require('webpack')
const tailwindcss = require('tailwindcss');
const path = require('path');

module.exports = {
    entry: './app/index.tsx',  // Updated to .tsx if your entry is a React component
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'opencopilot.js',
        library: 'OpenCopilot',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],  // Added .tsx and .ts
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            os: require.resolve("os-browserify/browser"),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,  // Matches both .ts and .tsx
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
};
