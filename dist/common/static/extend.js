define('extend', ['components/common/common', 'dialog', 'lib/wxjs/jweixin-1.2.0', 'apiData', 'lib/vue/vue.2.13.min'], function(require, exports, module) {

  /**
   * @desc 一些公共方法
   * Created Dio 2017-6-1 9:40:47
   */
  // 变量申明
  'use strict';
  
  var app = require('components/common/common');
  
  var dialog = require('dialog');
  var wx = require('lib/wxjs/jweixin-1.2.0');
  var api = require('apiData');
  // api = require('api'),
  
  var logintimes = 0;
  var tiptimes = 0;
  var off = false; // 用来控制点击事件
  
  var cover = '../common/images/qcode.png';
  
  // DEBUG: 用来测试的
  var isbug = app.getValue('debug');
  /**
   * @desc 一些过滤方法
   * Created Dio 2018年8月21日10:42:20
   *
   */
  var Vue = require('lib/vue/vue.2.13.min');
  // 格式化时间2
  Vue.filter('format', function (str, layout) {
    if (str) {
      return new Date(str).format(layout);
    }
  });
  
  // 格式化时间2
  Vue.filter('formatName', function (str, layout) {
    if (str) {
      return str;
    } else {
      return "null";
    }
  });
  
  // -----
  var extend = {
    /**
     * 版本号
     */
    version: "0.0.5",
    // gnote: { lng: "", lat: "" },
    /**
     * HTML5 浏览器的定位
     */
    geolocation: function geolocation() {
      var _this = this;
      // let obj = navigator.geolocation.getCurrentPosition(showPosition);
  
      function showPosition(position) {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
        console.log(_this);
        _this.gnote = {
          lng: lng,
          lat: lat
        };
  
        // var url = `http://api.map.baidu.com/geocoder/v2/?ak=mGaWIHAYzolxcE6hCNwDM4K6mFpyzyaf&location=${lat},${lng}&output=json&pois=1`;
        // $.getJSON(url, function(res) {
        //     // $("#msg").html(url);
        //     // alert(res.result.addressComponent.city);
        //     console.log(res)
        //     alert(11)
        // });
      }
      // return true;
      // var map = new BMap.Map("allmap");
      // var point = new BMap.Point(116.331398, 39.897445);
      // map.centerAndZoom(point, 12);
      var geolocation = new BMap.Geolocation();
  
      var geocoder = new BMap.Geocoder();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // var mk = new BMap.Marker(r.point);
          // map.addOverlay(mk);
          // map.panTo(r.point);
          console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
          geocoder.getLocation(r.point, function (res) {
            console.log(res);
          }, 1);
        } else {
          alert('failed' + this.getStatus());
        }
      }, {
        enableHighAccuracy: true
      });
    },
    /**
     * 左上角返回按钮
     */
    backOut: function backOut() {
      window.history.back();
      return false;
    },
    /**
     * 弹窗提示框
     * @param {string} msg  内容
     * @param {function} sureFunction 点击确定 function
     * @param {number} type 类型
     */
    popup: function popup(title, msg, sureFunction, cancelFunction, type, closedFunction) {
      var showBox = arguments.length <= 6 || arguments[6] === undefined ? "0" : arguments[6];
  
      var btnMsg = undefined,
          btnClass = undefined,
          btnClassEle = undefined;
  
      var btnSureMsg = undefined,
          btnCancelMsg = undefined,
          btnSureClass = undefined,
          btnCancelClass = undefined,
          btnSureClassEle = undefined,
          btnCancelClassEle = undefined;
      var blindEvent = undefined,
          footer = undefined;
      // 类型
      switch (type) {
        case 1:
          btnMsg = "我知道了";
          btnClass = 'ui-btnDialogGo';
          btnClassEle = '.' + btnClass;
          footer = [{
            name: '' + btnMsg,
            className: '' + btnClass
          }];
          blindEvent = [{
            ele: '' + btnClassEle,
            type: "click",
            fn: function fn() {
              _popup.close(sureFunction);
            }
          }, {
            // 右上角关闭
            ele: '.ui-dialog-close',
            type: "click",
            fn: function fn() {
              _popup.close(sureFunction);
            }
          }];
          break;
        case 2:
          btnSureMsg = "确认";
          btnCancelMsg = "取消";
          btnSureClass = 'ui-btnSure';
          btnCancelClass = 'ui-btnCancel';
          btnSureClassEle = '.' + btnSureClass;
          btnCancelClassEle = '.' + btnCancelClass;
          footer = [{
            name: '' + btnSureMsg,
            className: '' + btnSureClass
          }, {
            name: '' + btnCancelMsg,
            className: '' + btnCancelClass
          }];
          blindEvent = [{
            ele: '' + btnSureClassEle,
            type: "click",
            fn: function fn() {
              try {
                var check = document.getElementById("checkbox").checked;
                _popup.close(sureFunction(check));
              } catch (e) {
                _popup.close(sureFunction());
              }
            }
          }, {
            ele: '' + btnCancelClassEle,
            type: "click",
            fn: function fn() {
              _popup.close(cancelFunction);
            }
          }, {
            // 右上角关闭
            ele: '.ui-dialog-close',
            type: "click",
            fn: function fn() {
              _popup.close(cancelFunction);
            }
          }];
          break;
        case 3:
          btnSureMsg = "继续挑战";
          btnCancelMsg = "排行榜";
          btnSureClass = 'ui-btnSure';
          btnCancelClass = 'ui-btnCancel';
          btnSureClassEle = '.' + btnSureClass;
          btnCancelClassEle = '.' + btnCancelClass;
          footer = [{
            name: '' + btnSureMsg,
            className: '' + btnSureClass
          }, {
            name: '' + btnCancelMsg,
            className: '' + btnCancelClass
          }];
          blindEvent = [{
            ele: '' + btnSureClassEle,
            type: "click",
            fn: function fn() {
              _popup.close(sureFunction);
            }
          }, {
            ele: '' + btnCancelClassEle,
            type: "click",
            fn: function fn() {
              _popup.close(cancelFunction);
            }
          }, {
            // 右上角关闭
            ele: '.ui-dialog-close',
            type: "click",
            fn: function fn() {
              _popup.close(closedFunction);
            }
          }];
          break;
        default:
          btnMsg = "我知道了";
          btnClass = 'ui-btnDialogGo';
          btnClassEle = '.' + btnClass;
          footer = [{
            name: '' + btnMsg,
            className: '' + btnClass
          }];
          blindEvent = [{
            ele: '' + btnClassEle,
            type: "click",
            fn: function fn() {
              _popup.close(sureFunction);
            }
          }, {
            // 右上角关闭
            ele: '.ui-dialog-close',
            type: "click",
            fn: function fn() {
              _popup.close(sureFunction);
            }
          }];
      }
      var content = undefined;
      if (type == 2 && showBox == 1) {
        content = '<div class=\'ui-btnDialog-con\'>' + msg + '</div> <div class="nopop"><input type="checkbox" id="checkbox">不再提醒</div>';
      } else {
        content = '<div class=\'ui-btnDialog-con\'>' + msg + '</div>';
      }
      // 弹窗
      var _popup = dialog.dialog({
        id: "btnDialog",
        className: "ui-btnDialog",
        bgSwitch: true,
        closeSwitch: true,
        bgFn: false,
        title: '<div>' + title + '</div>',
        content: content,
        footer: footer,
        blindEvent: blindEvent
      });
      _popup.open();
    },
    /**
     *  微信浏览器检测与登录数据回调
     * @param {callback} 回调函数  带 二维码数据与 微信登录数据
     */
    wxIntercept: function wxIntercept(callback) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
  
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        var barData = app.getValue('barcodeData', 'session');
        var wxInfo = app.getValue('wxInfo', 'local');
        var wxLogin = app.getValue('wxLogin', 'local');
        barData = barData && JSON.parse(barData);
        wxLogin = wxLogin && JSON.parse(wxLogin);
        wxInfo = wxInfo && JSON.parse(wxInfo);
        // 统一限制 没有登录信息则跳转
        if (!wxLogin && type == 1 && window.th.status == 'on') {
          // this.wxWarranty()
          // app.linkTo('i');
          console.log('去重新认证');
          // this.callAuth()
  
          this.callBackAuth();
        } else {
          return callback && callback(barData, wxLogin, wxInfo);
        }
      } else {
        app.linkTo('noscan');
        return false;
      }
    },
    /**
     * 没有登录跳转娇子登录
     */
    callAuth: function callAuth() {
      var eurl = window.location.href;
      app.storeValue('url', eurl, 'session');
      window.location.href = window.th.authUrl + encodeURIComponent(window.location.origin + window.th.callPage);
      return false;
    },
    /**
     * 授权回调
     */
    callBackAuth: function callBackAuth() {
      // TODO: 授权功能回调
      // let eurl = window.location.href;
      var eurl = window.location.href;
      app.storeValue('url', eurl, 'session');
      var callpage = window.th.hosturl + window.th.callPage + '?type=4';
  
      if (isbug) {
        callpage = callpage + "&o=1";
      }
  
      api.getUserInfoCallBackUrl(callpage).done(function (res) {
        if (res.code == 200) {
          window.location.href = res.data;
          return false;
        } else {
          res.msg && dialog.tipDialog(res.msg);
        }
      });
    },
    /**
     * 微信回调地址
     * @param {appid} 项目微信的APPID
     * @param {redirectUri} 回调地址
     */
    wxWarranty: function wxWarranty(appId, redirectUri) {
      // 存储返回路径
      app.storeValue("url", window.location.pathname, "session");
      var wappId = appId || window.th.wappId;
  
      var hosturl = location.origin || location.protocol + '//' + location.hostname;
  
      var wredirectUri = redirectUri || window.th.Domain + '?' + hosturl + window.th.callPage;
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wappId + '&redirect_uri=' + wredirectUri + '&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect';
      return false;
    },
  
    /**
     * 不支持 170 与171 号码的充值
     */
    getCheckout: function getCheckout(phone, callback) {
      var rel = /^(170|171)\d{8}$/;
      if (rel.test(phone)) {
        dialog.tipDialog('该号段暂不支持充值，请重新填写');
        return false;
      }
      return callback && callback();
    },
    /**
     * 辅助改变url
     *
     * @param {any} url 目标url
     * @param {any} arg 需要替换的参数名称
     * @param {any} arg_val  替换后的参数的值
     * @returns url 参数替换后的url
     */
    changeURLArg: function changeURLArg(url, arg, arg_val) {
      var pattern = arg + '=([^&]*)';
      var replaceText = arg + '=' + arg_val;
      if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
      } else {
        if (url.match('[\?]')) {
          return url + '&' + replaceText;
        } else {
          return url + '?' + replaceText;
        }
      }
      return url + '\n' + arg + '\n' + arg_val;
    },
    /**
     * 变更当前URL中的参数,并改变 history里的记录值
     */
    replaceURL: function replaceURL(key, val) {
      var oURL = window.location.href;
      var nURL = this.changeURLArg(oURL, key, val);
      window.history.replaceState(null, null, nURL);
    },
  
    /**
     * @desc  提取URL 中加密的参数
     * @param {any} key
     * @param {string} [type='url']
     */
    getValue: function getValue(key) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? 'url' : arguments[1];
  
      return this.getParamValue(key);
    },
    /**
     * url中提取值辅助函数
     *
     * @returns
     */
    getUrlparams: function getUrlparams() {
      var src = window.location.search;
  
      var arr = src.substr(1, src.length - 1).split("&");
  
      var returnObj = {};
      if (arr !== null) {
        for (var i = 0, l = arr.length; i < l; i++) {
          var value = arr[i].split("=");
          if (value && value.length > 1) {
            returnObj[decodeURIComponent(value[0])] = value[1];
          }
        }
      }
      return returnObj;
    },
    /**
     * url中提取值
     *
     * @param {any} name
     * @returns
     */
    getParamValue: function getParamValue(name) {
      var param = this.getUrlparams();
      if (param[name]) {
        return app.d.unCompile(param[name]);
      }
      return null;
    },
    /**
     * 辅助函数
     *
     * @param {any} obj
     * @returns
     */
    typeName: function typeName(obj) {
      var t;
      if (obj == null) {
        t = String(obj);
      } else {
        t = Object.prototype.toString.call(obj).toLowerCase();
        t = t.substring(8, t.length - 1);
      }
      return t;
    },
  
    /**
     * 加密参数页面跳转
     *
     * @param {any} name html名称
     * @param {any} obj  后面的参数
     * @param {any} location
     */
    linkTo: function linkTo(name, obj, location) {
      if (app.URL[name]) {
        var Url = app.URL[name];
        if (obj) {
          Url += "?";
          var _type = this.typeName(obj);
          switch (_type) {
            case "string":
              Url += encodeURIComponent(obj);
              break;
            case "object":
              for (var _name in obj) {
                Url += "&" + encodeURIComponent(_name) + "=" + app.d.Compile(obj[_name]);
              }
              break;
          }
          // 增加一个时间戳
          // Url = Url + "&" + getTimestamp();
        }
        window.location.href = location ? location + Url : Url;
        return false;
      }
    },
    /**
     * 阻止按钮提交方法
     * @param callback
     * @returns {*}
     */
    bannedClick: function bannedClick(callback) {
      var en = off;
      if (en) {} else {
        off = true;
        return callback && callback();
      }
    },
    /**
     * 启动按钮提交方法
     * @param of  true or false
     * @param callback 回调fn
     * @returns {*}
     */
    doClick: function doClick(of, callback) {
      if (of) {
        off = false;
        return callback && callback();
      }
    },
    /**
     * 正则匹配特殊字符
     *
     * @param {any} s
     */
    checkStr: function checkStr(s) {
      var reg = /[`~!@#$^&*()=|{}':;',\[\].<>\/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/gi;
      if (reg.test(s)) {
        return true;
      } else {
        return false;
      }
    },
  
    /**
     * 开启分享的功能
     * @param {object}} config 微信配置信息
     */
    doShare: function doShare(config, shareID) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'hideMenuItems', 'onMenuShareTimeline', 'showOptionMenu', 'showMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
  
      wx.ready(function () {
        wx.showOptionMenu(); // 显示分享按钮
  
        wx.onMenuShareAppMessage({
          title: 'title画好月圆 宽窄传情',
          desc: 'desc画好月圆 宽窄传情',
          link: window.th.hosturl + '/' + window.th.sharePage + '?shareid=' + shareID,
          imgUrl: window.th.hosturl + '/sichuan/2018zhongqiu/https://xxc-oss.taiheiot.com/static/' + cover,
          trigger: function trigger(res) {
            // vm.wxRecord = false;
          },
          success: function success(res) {
            console.log("AppMessage ok");
            // vm.wxRecord = false;
          }
        });
        wx.onMenuShareTimeline({
          title: 'title画好月圆 宽窄传情',
          desc: 'desc画好月圆 宽窄传情',
          link: window.th.hosturl + '/' + window.th.sharePage + '?shareid=' + shareID,
          imgUrl: window.th.hosturl + '/sichuan/2018zhongqiu/https://xxc-oss.taiheiot.com/static/' + cover,
          trigger: function trigger(res) {
            // vm.wxRecord = false;
          },
          success: function success(res) {
            // vm.wxRecord = false;
            console.log("Timeline ok");
          }
  
        });
        wx.showMenuItems({
          menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
        });
        wx.hideMenuItems({
          menuList: ["menuItem:setFont", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:readMode", "menuItem:originPage", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"]
        });
      });
    }
  
  };
  module.exports = extend;

});