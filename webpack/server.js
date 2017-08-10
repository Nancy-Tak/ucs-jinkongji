const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');
const constants = require('./constants');


new WebpackDevServer(webpack(config), {
  contentBase: constants.ABSOLUTE_BASE,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/*': {
      // RAP mock服务器  需要配置host 172.17.13.37 rap.ring
      target: 'http://rap.ring/',
      pathRewrite: {
        '^/api': `/mockjsdata/${constants.PROJECT_ID}/back`
      },
      secure: false,
      changeOrigin: true,
    }
  },
  stats: {colors: true}
}).listen(constants.PORT, constants.HOST, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at ${constants.HOST}:${constants.PORT}/`);
});
