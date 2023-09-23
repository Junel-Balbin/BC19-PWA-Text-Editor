// Imports webpack plugins and modules.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development', // Set the mode to development.
    entry: { // Define entry points for the app.
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: { // Configure output settings.
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ // Configure plugins & Generate HTML file using 'index.html' as template.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest({ // Inject the service worker into the build.
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({ // Generate the PWA manifest file.
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Text Editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],        
      }),
    ],
    
// Configure module rules & CSS loaders and babel loader to webpack.
    module: {
      rules: [
        {  // Use style-loader and css-loader for .css files.
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {  // Use babel-loader for transpiling .js files.
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        }
      ],
    },
  };
};


// Template Structure and Code Snippets from Mini Project 19.