module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: false, // 自动启动浏览器
        host: '0.0.0.0', // localhost
        port: 8080, // 端口号
        https: false,
        hotOnly: true, // 热更新
        proxy: {
            '^/api': {
                target: 'http://152.136.98.38:27070', // 重写路径
                ws: false, //开启WebSocket
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}