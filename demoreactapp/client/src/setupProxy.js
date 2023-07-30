
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(createProxyMiddleware('/socket.io',{target:'http://localhost:5000',changeOrigin: true, ws: true})),
    app.use(createProxyMiddleware('/api',{target:'http://localhost:5000'}))
    app.use(createProxyMiddleware('/weather/**', {target: 'https://dataset.api.hub.geosphere.at/v1/station/current/tawes-v1-10min?parameters=TL&station_ids=11035', secure: false, changeOrigin: true, ignorePath: true, debug: true}))
}