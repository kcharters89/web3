// webpack.config.js
module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
      filename: 'main.js',
      publicPath: 'dist'
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
        }
      ]
    }
  };