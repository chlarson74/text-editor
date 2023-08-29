const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      //repurposed code that was in the mini-project
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.'
      }),
      //adds the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      
      //create a manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE',
        short_name: 'JATE',
        description: 'Text Editor',
        background_color: '#000',
        theme_color: '#000',
        start_url: './',
        publicPath: './',
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128],
          destination: path.join('assets', 'icons'),
          },
        ],
      })
    ],
    
    module: {
      // TODO: Add CSS loaders and babel to webpack.
      //repurposed code that was in the mini-project
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test:/\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/presetn-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/tranform-runtime'],
            },
          },
        },
      ],
    },
  };
};
