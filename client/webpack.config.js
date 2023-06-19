const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

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
      // Webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // custom Service Worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'It\'s better than talking to yourself',
        start_url: './',
        publicPath: './',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],

    module: {
      rules: [
        {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', 
                '@babel/transform-runtime'
              ],
            }
          }
        }
      ],
    },
  };
};
