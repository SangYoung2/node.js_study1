// 프록시를 이용하여 지정한  url에서 오는 데이터는 허락하도록 설정
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};