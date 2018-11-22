
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import Route from './routes';
import webpackConfig from '../webpack.config.dev';

require('dotenv')
  .config();

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));

app.use(webpackHotMiddleware(compiler));
// Log requests to the console.

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static('client'));

Route(app);
// Setup a default route that sends back a welcome message in JSON format.
app.get('/*', (req, res) => {
  res.status(200)
    .sendFile(
      path.join(__dirname, '../client/index.html'));
});
module.exports = app;
