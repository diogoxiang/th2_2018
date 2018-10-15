/**
 * 配置文件
 * @param {
 *  wappId: 微信授权ID
 *  Domain: 微信回调域名
 *  callPage: 微信回调页面
 *  cardId: 341 // 纪念卡ID  上线要改
 * }
 */
// 测试用   wxc7a0b4e1711c2867
window.th = {
    // wappId: (window.location.host.indexOf("cncqti") > -1) ? "wx5f63763b545926ce" : 'wx8b2379e6e1bf2d3d', // wappId: 微信授权ID 开发wx8b2379e6e1bf2d3d  正式 wx5f63763b545926ce
    // Domain: 'http://qt.cncqti.com/jump.html', // Domain: 微信回调域名
    // debugPage: '/anhui/2018pintu/debug.html',  // debugpager 页面
    callPage: '/anhui/common/loading.html', // callPage: 微信授权回调页面
    hosturl: (location.origin || (location.protocol + '//' + location.hostname)),
    // sharePage: '/anhui/2018pintu/share.html',
    status: 'on', // 活动状态
    shareTitle: "【情满黄山·礼迎双节】", //分享标题
    shareDesc: '9月22日-10月7日，参与黄山双节活动，赢取华为P20、iPad、京东E卡等节日好礼', // 分享的描述只有分享给朋友才有
    shareUrl: '/anhui/anhui-kuaishan/kuaishan.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 相对地址
    shareImg: '/anhui/anhui-kuaishan/share.jpg', // 分享的图片地址
    // 娇子认证
    // authUrl: 'http://shop.sctobacco.com/wechat/authorize.htm?client_id=thwl&callback_url='
}
// 配置信息
const HOST = {
    // port: "/",
    port: "http://ynyx.taiheiot.com/",
    // port:"http://192.168.1.173:8087/",
    // port: "http://192.168.1.178:8087/",
    // port: "http://demo2.taiheiot.com/sz-api-webapp/",
    prefix: window.localStorage.getItem("project") || "__anhui2018__"
}
// 一些错误的code
window.msgError = {
    // 请求活动详情报错
    1001: '[1001]网络错误,请稍后再试....'
}
