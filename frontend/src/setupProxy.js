const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/test-bucket',
    createProxyMiddleware({
      target: 'http://localstack:4566',
    })
  );
};
