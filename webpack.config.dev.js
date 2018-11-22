import path from 'path';
import webpack from 'webpack';

export default {
  // devtools: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/index.js'),
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.join(__dirname, 'client'),
        path.join(__dirname, 'server/shared/'),
      ],
      loader: ['react-hot-loader', 'babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: path.join(__dirname, 'client'),
      query: {
        presets: ['es2015', 'react'],
      },
    }, {
      test: /\.scss$/,
      include: path.join(__dirname, 'client'),
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192',
    },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
