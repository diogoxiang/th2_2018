fis.th({
    name: 'common', // 项目名，可选
    paths: { // 配置第三方组件
        $: 'lib/zepto/zepto.1.2.0.min.js',
        vue: 'lib/vue/vue.2.13.min.js',
        wx: 'lib/wxjs/jweixin-1.2.0.js',
        anime: 'lib/anime/anime.min.js'

    },
    shim: {
        /* 'weui': {//配置第三方组件的依赖
             deps: ['$']/!*,
              exports: 'myFunc'*!/
         }, */
    },
    framework: {
        cache: false, // 开启localstorage缓存
        combo: false, // 开启合并
        comboPattern: '',
        urlPattern: '', // 静态资源加载路径模式
        urlPrefix: '' // 静态资源加载路径模式
    },
    base: ['views/setfont.js', 'lib/scrat/scrat.js', 'lib/diocss/dio.min.css'], // 所有页面都会加载的资源，可以是js，css
    domain: '', // 配置共有静态资源域名
    ossDomain: "https://xxc-oss.taiheiot.com/v20181015/", // OSS目录引用域名 可为空
    version: '', // 版本号,可选
    deploy: 'F:\\github.com\\th2_2018\\dist', // 发布测试路径
    prodPloay: "F:\\github.com\\th2_2018\\distprod"
    // prodPloay: 'F:\\Diogo\\tobaccoSvn\\201706_外_安徽中烟项目\\源代码\\trunk\\WEB_Front\\online' // 发布到生产路径
})
