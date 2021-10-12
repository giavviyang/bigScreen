module.exports = {
    devServer: {
        proxy: {
            '/api': {//http://192.168.xx.xx/api/xx/  首页后台接口：相对路径
                // target: 'http://192.168.0.6:8081/Statistics',//目的地址路径 本地研发环境
                // target: 'http://192.168.0.9:8081/Statistics',//目的地址路径 本地研发环境
                // target: 'http://192.168.0.10:8081/archiveRetrieval',//目的地址路径 本地研发环境
                target: 'http://192.168.0.6:8081/',//目的地址路径 本地研发环境
                changeOrigin: true,//允许跨域
                pathRewrite: {//重定向
                    "^/api": ""
                }
            },
            '/foo': {//http://192.168.xx.xx/api/xx/  搜索页后台接口：相对路径
                // target: 'http://192.168.0.6:8081/Statistics',//目的地址路径 本地研发环境
                // target: 'http://192.168.0.9:8081/Statistics',//目的地址路径 本地研发环境
                // target: 'http://192.168.0.10:8081/archiveRetrieval',//目的地址路径 本地研发环境
                // target: 'http://192.168.0.9:8081/',//目的地址路径 本地研发环境
                target: 'http://192.168.0.6:8081/',//目的地址路径 本地研发环境
                changeOrigin: true,//允许跨域
                pathRewrite: {//重定向
                    "^/foo": ""
                }
            },
        }
    }
}