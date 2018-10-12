/**
 * Created by Diogo on 2017年2月21日10:06:20.
 * Modify by  2017年6月1日10:00:31
 * 命名规则: 驼峰式
 * 命名规范: isXXXX 是做判断  getXXX 是获取数据   doXXXX 是提交数据
 * 错误返回值:
 */
let app = require('common')

let date = {
  // 微信登录 用户系统
  userLoginRegister: {
    // url: 'cloud2.activity.api/activityPluzzle/userLoginRegister.do',
    url: 'cloud2.activity.api/app/v2/appConfigThirdparty/getUserInfoLoginFromKJ.do',
    param: 'msg,type,channelType',
    type: 'POST'
  },
  // 获取活动信息
  getActivityIdForAvtivityList: {
    url: 'cloud2.activity.api/app/v2/appConfigThirdparty/getActivityIdForAvtivityList.do',
    param: 'type',
    type: 'POST'
  },
  /**
     * 获取微信的JS sdk 参数配置
     */
  getJssdk: {
    url: 'cloud2.activity.api/wx/jsSignature.do',
    // url: 'cloud2.platform/wx/jsSignature.do',
    param: 'url',
    type: 'post'
  },
  // 授权地址
  getUserInfoCallBackUrl: {
    url: 'cloud2.activity.api/app/v2/appConfigThirdparty/getUserInfoCallBackUrl.do',
    param: 'redirectUrl',
    type: 'POST'
  }
}

module.exports = app.moduleFactory(date)
