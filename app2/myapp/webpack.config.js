// webpack.config.js
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public/javascripts')
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel_loader',
            loader: 'style-loader',
            loader: 'css-loader',
            loader: 'sass-loader',
          query:{
            presets:['@babel/react']
          },

         
          }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query:
          {
              presets:['@babel/preset-env',
              '@babel/react',{
              'plugins': ['@babel/plugin-proposal-class-properties']}]
          }
      }
      ]
    }
  };