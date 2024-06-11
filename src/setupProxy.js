// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://webhook.site', // your webhook URL domain
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api prefix when forwarding to webhook.site
      },
    })
  );
};
