define('components/common/common', ["lib/zepto/zepto.1.2.0.min", "dialog"], function(require, exports, module) {

  /**
   * Created by pdc on 2016/10/18.
   */
  "use strict";
  
  require("lib/zepto/zepto.1.2.0.min");
  var URL = {"index":"index.html","debug":"debug.html","loading":"loading.html","noscan":"noscan.html","wxLogin":"wxLogin.html"},
      //框架自动生成页路径对应表
  dialog = require("dialog"),
      rword = /[, ]+/g,
      WIN = window,
      DOC = document;
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
'use strict';

window.th = {
    // wappId: (window.location.host.indexOf("cncqti") > -1) ? "wx5f63763b545926ce" : 'wx8b2379e6e1bf2d3d', // wappId: 微信授权ID 开发wx8b2379e6e1bf2d3d  正式 wx5f63763b545926ce
    // Domain: 'http://qt.cncqti.com/jump.html', // Domain: 微信回调域名
    // debugPage: '/anhui/2018pintu/debug.html',  // debugpager 页面
    callPage: '/anhui/common/loading.html', // callPage: 微信授权回调页面
    hosturl: location.origin || location.protocol + '//' + location.hostname,
    // sharePage: '/anhui/2018pintu/share.html',
    status: 'on', // 活动状态
    shareTitle: "【情满黄山·礼迎双节】", //分享标题
    shareDesc: '9月22日-10月7日，参与黄山双节活动，赢取华为P20、iPad、京东E卡等节日好礼', // 分享的描述只有分享给朋友才有
    shareUrl: '/anhui/anhui-kuaishan/kuaishan.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 相对地址
    shareImg: '/anhui/anhui-kuaishan/share.jpg' };
// 分享的图片地址
// 娇子认证
// authUrl: 'http://shop.sctobacco.com/wechat/authorize.htm?client_id=thwl&callback_url='
// 配置信息
var HOST = {
    port: "/",
    // port: "http://ynyx.taiheiot.com/",
    // port:"http://192.168.1.173:8087/",
    // port: "http://192.168.1.178:8087/",
    // port: "http://demo2.taiheiot.com/sz-api-webapp/",
    prefix: window.localStorage.getItem("project") || "__anhui2018__"
};
// 一些错误的code
window.msgError = {
    // 请求活动详情报错
    1001: '[1001]网络错误,请稍后再试....'
};; //插入host配置
  /**
   * @desc 加密方法
   */
  /*
 *@author diogo 2017-4-12 19:33:19
 *
 *功能：对url加密算法（只针对window.location.href跳转，不针对post表单提交及ajax方式）
 *算法：对于暴露在浏览器地址栏中的属性值进行加密，如一个属性为agentID=1，
 *     若对1加密后为k230101io934jksd32r4，说明如下：
 *     前三位为随机数；
 *     第四到第五位为要加密字符转换成16进制的位数，
 *       如：要加密字符为15转换成16进制为f，位数为1，则第四、五位为01；
 *     第六位标识要加密字符为何种字符，0：纯数字，1：字符
 *       若是字符和数字的混合，则不加密；
 *     从第七位开始为16进制转换后的字符（字母和非数字先转换成asc码）；
 *     若加密后的字符总位数不足20位，则用随机数补齐到20位，若超出20位，则不加随机数。
 *     即加密后总位数至少为20位。
 */
"use strict";

function encode16(str) {
    str = str.toLowerCase();
    if (str.match(/^[-+]?\d*$/) == null) {
        //非整数字符，对每一个字符都转换成16进制，然后拼接
        var s = str.split("");
        var temp = "";
        for (var i = 0; i < s.length; i++) {
            s[i] = s[i].charCodeAt(); //先转换成Unicode编码
            s[i] = s[i].toString(16);
            temp = temp + s[i];
        }
        return temp + "{" + 1; //1代表字符
    } else {
            //数字直接转换成16进制
            str = parseInt(str).toString(16);
        }
    return str + "{" + 0; //0代表纯数字
}

/**
 * @desc 生成随机数
 *
 * @param {any} n
 * @returns
 */
function produceRandom(n) {
    var num = "";
    for (var i = 0; i < n; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}

/**
 * 支持:"abc"与数字
 * 不支持:中文
 *
 * @param {any} str
 * @returns
 */
//主加密函数
function encrypt(str) {
    var encryptStr = ""; //最终返回的加密后的字符串
    encryptStr += produceRandom(3); //产生3位随机数

    var temp = encode16(str).split("{"); //对要加密的字符转换成16进制
    var numLength = temp[0].length; //转换后的字符长度
    numLength = numLength.toString(16); //字符长度换算成16进制
    if (numLength.length == 1) {
        //如果是1，补一个0
        numLength = "0" + numLength;
    } else if (numLength.length > 2) {
        //转换后的16进制字符长度如果大于2位数，则返回，不支持
        return "";
    }
    encryptStr += numLength;

    if (temp[1] == "0") {
        encryptStr += 0;
    } else if (temp[1] == "1") {
        encryptStr += 1;
    }

    encryptStr += temp[0];

    if (encryptStr.length < 20) {
        //如果小于20位，补上随机数
        var ran = produceRandom(20 - encryptStr.length);
        encryptStr += ran;
    }
    return encryptStr;
}

// 主解密函数
function unEncrypt(str) {
    var charLength = str.substring(3, 5); //加密后的字符有多少位
    var charLen = parseInt(charLength, 16); //转换成10进制
    var type = parseInt(str.substring(5, 6)); //加密字符的类型（0：数字，1：字符串）
    var valueEnc = str.substring(6, 6 + charLen);

    if (type == 0) {
        var trueValue = parseInt(valueEnc, 16);
        return trueValue;
    } else {

        var sb = [],
            valueEncArray = valueEnc.split("");
        console.log(valueEncArray);
        for (var i = 0; i < valueEncArray.length; i += 2) {
            var n = parseInt(valueEncArray[i] + valueEncArray[i + 1], 16); //转换成10进制的asc码
            sb.push(String.fromCharCode(n));
        }
        return sb.join('');
    }
}

/**
 * @desc 这个可用于混编加中文的密码
 *
 * @param {any} code
 * @returns
 */
function compile(code) {
    code = code + '';
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
}

// console.log(compile(123))   ==> 4ce

/**
 * @desc 解密码
 *
 * @param {any} code
 * @returns
 */
function uncompile(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}

// part B
/**
 * @desc 另类随机值
 */
var char = 'diogoxiang20170413'; //KEY
var pre = '0x'; //固定两个字符串

function getRandom(n) {
    var res = "";
    var chars = [];
    chars = char.split("");
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * (char.length - 1));
        res += pre + chars[id];
    }
    return res;
}
/**
 * @desc nEncode16
 *
 * @param {any} str
 * @returns
 */
function nEncode16(str) {
    str = str.toLowerCase();
    if (str.match(/^[-+]?\d*$/) == null) {
        //非整数字符，对每一个字符都转换成16进制，然后拼接
        var s = str.split("");
        var temp = "";
        for (var i = 0; i < s.length; i++) {
            s[i] = s[i].charCodeAt(); //先转换成Unicode编码
            s[i] = s[i].toString(16);
            temp = temp + pre + s[i];
        }
        return temp + "{" + 1; //1代表字符
    } else {
            //数字直接转换成16进制
            str = parseInt(str).toString(16);
        }
    return str + "{" + 0; //0代表纯数字
}

/**
 *
 * @desc new 加密
 * @param {any} str
 * @returns
 */
function nEncrypt(str) {
    var encryptStr = ""; //最终返回的加密后的字符串
    encryptStr += getRandom(2); //产生3位随机数

    var temp = nEncode16(str).split("{"); //对要加密的字符转换成16进制
    var numLength = temp[0].length; //转换后的字符长度
    numLength = numLength.toString(16); //字符长度换算成16进制
    if (numLength.length == 1) {
        //如果是1，补一个0
        numLength = "0" + numLength;
    } else if (numLength.length > 2) {
        //转换后的16进制字符长度如果大于2位数，则返回，不支持
        return "";
    }
    encryptStr += numLength;

    if (temp[1] == "0") {
        encryptStr += 0;
    } else if (temp[1] == "1") {
        encryptStr += 1;
    }

    encryptStr += temp[0];

    if (encryptStr.length < 20) {
        //如果小于20位，补上随机数
        var ran = getRandom(20 - encryptStr.length);
        encryptStr += ran;
    }
    return encryptStr;
}

function uNencrypt(str) {
    var charLength = str.substring(6, 8); //加密后的字符有多少位
    var charLen = parseInt(charLength, 16); //转换成10进制
    var type = parseInt(str.substring(8, 9)); //加密字符的类型（0：数字，1：字符串）
    var valueEnc = str.substring(9, 9 + charLen);
    if (type == 0) {
        var trueValue = parseInt(valueEnc, 16);
        return trueValue;
    } else {

        var sb = [],
            valueEncArray = valueEnc.split(pre);
        console.log(valueEncArray);
        for (var i = 1; i < valueEncArray.length; i++) {
            var n = parseInt(valueEncArray[i], 16); //转换成10进制的asc码
            sb.push(String.fromCharCode(n));
        }
        return sb.join('');
    }
}
// console.log(nEncrypt("1"));

var dioE = {
    Encrypt: encrypt,
    unEncrypt: unEncrypt,
    Compile: compile,
    unCompile: uncompile,
    nEncrypt: nEncrypt,
    uNencrypt: uNencrypt
};;
  
  var Loading = (function () {
      var count = 0,
          div = undefined,
          html = "<div class='ui-loading-bg'></div>\n                <div class='ui-loading-box'>\n                    <div class='ui-loading'>\n                        <div class='ui-loading-icon ui-loading-icon-0'></div>\n                        <div class='ui-loading-icon ui-loading-icon-1'></div>\n                        <div class='ui-loading-icon ui-loading-icon-2'></div>\n                        <div class='ui-loading-icon ui-loading-icon-3'></div>\n                        <div class='ui-loading-icon ui-loading-icon-4'></div>\n                        <div class='ui-loading-icon ui-loading-icon-5'></div>\n                        <div class='ui-loading-icon ui-loading-icon-6'></div>\n                        <div class='ui-loading-icon ui-loading-icon-7'></div>\n                        <div class='ui-loading-icon ui-loading-icon-8'></div>\n                        <div class='ui-loading-icon ui-loading-icon-9'></div>\n                        <div class='ui-loading-icon ui-loading-icon-10'></div>\n                        <div class='ui-loading-icon ui-loading-icon-11'></div>\n                    </div>\n                    <p class='ui-loading-p'>数据加载中</p>\n            </div>";
      //页面内容显示LOADIN
      var Content = {
          show: function show() {
              if (count < 1) {
                  if (!div) {
                      div = DOC.createElement("div");
                      div.className = "ui-loading-wrap";
                      div.innerHTML = html;
                  }
                  DOC.body.appendChild(div);
              }
              count++;
              // debugger
          },
          hide: function hide() {
              if (count <= 1) {
                  div && DOC.body.removeChild(div);
              }
              count--;
          }
      };
      return {
          show: function show() {
              var type = arguments.length <= 0 || arguments[0] === undefined ? "content" : arguments[0];
  
              if (type == "content") {
                  Content.show();
              }
          },
          hide: function hide() {
              var type = arguments.length <= 0 || arguments[0] === undefined ? "content" : arguments[0];
  
              if (type == "content") {
                  Content.hide();
              }
          }
      };
  })();
  
  /**
   * 设置cookie
   *
   * @param {any} c_name
   * @param {any} value
   * @param {any} expiredays
   */
  function setCookie(c_name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      DOC.cookie = c_name + "=" + decodeURI(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
  }
  
  /**
   * 获取cookie
   *
   * @param {any} cookieName
   * @returns
   */
  function getCookie(cookieName) {
      var start = DOC.cookie.indexOf(cookieName + "=");
      if (start == -1) {
          return "";
      }
      start = start + cookieName.length + 1;
      var end = DOC.cookie.indexOf(";", start);
      if (end == -1) {
          end = DOC.cookie.length;
      }
      return decodeURIComponent(DOC.cookie.substring(start, end));
  }
  
  /**
   * 存储键值对
   *
   * @param {any} key
   * @param {any} value
   * @param {string} [type="url"]
   * @param {string} [expiredays=""]
   * @returns
   */
  function storeValue(key, value) {
      var type = arguments.length <= 2 || arguments[2] === undefined ? "url" : arguments[2];
      var expiredays = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];
  
      switch (type) {
          case "url":
              return "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value);
          case "local":
              window.localStorage && localStorage.setItem(HOST.prefix + key, value);
              break;
          case "session":
              window.sessionStorage && sessionStorage.setItem(HOST.prefix + key, value);
              break;
          case "cookie":
              setCookie(HOST.prefix + key, value, expiredays);
              break;
  
      }
  };
  
  /**
   * 提取值
   * 默认是从URL中提取
   * @param {any} key
   * @param {string} [type="url"]
   * @returns
   */
  function getValue(key) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? "url" : arguments[1];
  
      switch (type) {
          case "url":
              return getParamValue(key);
              break;
          case "local":
              return localStorage.getItem(HOST.prefix + key);
              break;
          case "session":
              return sessionStorage.getItem(HOST.prefix + key);
              break;
          case "cookie":
              return getCookie(HOST.prefix + key);
              break;
      }
  };
  
  /**
   * 删除 localStorage cookie 与 sessionStorage 中的值
   *
   * @param {any} key
   * @param {any} type
   * @returns
   */
  function deleteValue(key, type) {
      var type = type || "all";
      if (!key) {
          localStorage.clear();
          sessionStorage.clear();
          return;
      }
      switch (type) {
          case "all":
              localStorage.removeItem(HOST.prefix + key);
              sessionStorage.removeItem(HOST.prefix + key);
              setCookie(HOST.prefix + key, "", -1);
              break;
          case "local":
              localStorage.removeItem(HOST.prefix + key);
              break;
          case "session":
              sessionStorage.removeItem(HOST.prefix + key);
              break;
          case "cookie":
              setCookie(HOST.prefix + key, "", -1);
              break;
      }
  };
  
  /**
   * url中提取值辅助函数
   *
   * @returns
   */
  function getUrlparams() {
      var src = window.location.search,
          arr = src.substr(1, src.length - 1).split("&"),
          returnObj = {};
      if (arr !== null) {
          for (var i = 0, l = arr.length; i < l; i++) {
              var value = arr[i].split("=");
              if (value && value.length > 1) {
                  returnObj[decodeURIComponent(value[0])] = decodeURIComponent(value[1]);
              }
          }
      }
      return returnObj;
  };
  /**
   * url中提取值
   *
   * @param {any} name
   * @returns
   */
  function getParamValue(name) {
      var param = getUrlparams();
      if (param[name]) {
          return param[name];
      }
      return null;
  }
  
  /**
   * 转换obj类型
   *
   * @param {any} obj
   * @returns
   */
  function type(obj) {
      var t;
      if (obj == null) {
          t = String(obj);
      } else {
          t = Object.prototype.toString.call(obj).toLowerCase();
          t = t.substring(8, t.length - 1);
      }
      return t;
  }
  
  /**
   * 常规页面跳转
   *
   * @param {any} name html名称
   * @param {any} obj  后面的参数
   * @param {any} location
   */
  function linkTo(name, obj, location) {
      if (URL[name]) {
  
          var Url = URL[name];
          if (obj) {
              Url += "?";
              var _type = type(obj);
              switch (_type) {
                  case "string":
                      Url += encodeURIComponent(obj);
                      break;
                  case "object":
                      for (var _name in obj) {
                          Url += "&" + encodeURIComponent(_name) + "=" + encodeURIComponent(obj[_name]);
                      }
                      break;
              }
              //增加一个时间戳
              Url = Url + "&" + getTimestamp();
          }
  
          window.location.href = location ? location + Url : Url;
          return false;
      }
      // fix 临时用与跨目录跳转
      // name = "index.html"  or "xxx.html"
      if (location) {
          window.location.href = location + name;
          return false;
      }
  }
  /**
   * 601跳转登录
   * @return {[type]} [description]
   */
  function _callAuth() {
      var eurl = window.location.href;
      storeValue('url', eurl, 'session');
      window.location.href = window.th.authUrl + encodeURIComponent(window.location.origin + window.th.callPage);
      return false;
  }
  
  /**
   * 接口调用控制
   *
   * @param {any} apiName 接口名称
   * @param {any} apiSource  接口地址
   * @returns
   */
  function useApi(apiName, apiSource) {
      var source = apiSource || {},
          apiObj = source[apiName];
      if (!apiObj) {
          console.log("未找到" + apiName + "接口相关数据");
          return false;
      }
      return {
          url: HOST.port + apiObj.url,
          data: function data() {
              var str = apiObj.param,
                  _data = {};
              if (str) {
                  str = str.split(rword);
                  var len = str.length,
                      pop = Array.prototype.pop;
                  while (str[len - 1]) {
                      var name = str[len - 1],
                          value = pop.apply(arguments);
                      _data[name] = value == "undefined" ? "" : value;
                      len--;
                  }
              }
              return _data;
          },
          type: apiObj.type || "get",
          async: apiObj.async || true
      };
  }
  
  /**
   * 封装带有loading图标的ajax请求
   *
   * @param {any} param
   * @param {boolean} [showLoading=true]
   * @returns
   */
  function loadAjax(param) {
      var showLoading = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  
      showLoading && Loading.show();
      var dtd = $.Deferred();
      return $.ajax({
          type: param.type || "post",
          url: param.url,
          data: param.data,
          async: param.async || true
      }).done(function (data) {
          // debugger
          if (data.code == 601) {
              // _callAuth();
              // 清理当前数据
              window.localStorage.clear();
              window.sessionStorage.clear();
              // 重新刷新页面
              window.location.reload();
              return false;
          }
      }).fail(function (data) {
          if (data.msg) {
              dialog.tipDialog(data.msg);
          }
      }).always(function (date) {
          showLoading && Loading.hide();
          param.complete && param.complete(date);
      });
  }
  
  /**
   * MODULE生成对应返回接口工厂函数
   *
   * @param {any} data
   * @returns obj 包含接口地址的对像
   */
  function moduleFactory(data) {
      var obj = {};
      $.each(data, function (name, value) {
          obj[name] = function () {
              var api = useApi(name, data);
              if (data[name].fn) {
                  return data[name].fn.call(this, api.url, api.data.apply(this, arguments));
              } else {
                  return loadAjax({
                      url: api.url,
                      data: api.data.apply(this, arguments),
                      type: api.type,
                      async: api.async
                  });
              }
          };
      });
      return obj;
  }
  
  /**
   * 预加载图片
   *
   * @param {any} array
   * @param {any} suc
   * @param {any} fai
   */
  function loadImage(array, suc, fai) {
      var l = array.length,
          i = 0,
          j = 0; //j----加载图片的总数（包括成功和失败的）；i----加载成功的图片张数
  
      var _loop = function () {
          var image = new Image();
          image.src = array[l - 1];
          var fn = (function (l) {
              return function () {
                  i += 1;
                  j += 1;
                  suc && suc.call(this, j, image, array[l - 1], l);
              };
          })(l);
          if (image.complete) {
              // 如果图片已经存在于浏览器缓存，直接调用回调函数
              fn();
          } else {
              image.onload = fn;
              image.onerror = (function (l) {
                  return function () {
                      j += 1;
                      console.log("资源 " + array[l] + " 未能加载成功，请检查网络或者是否加载正确地址");
                      fai && fai.call(this, j, i, array[l - 1], l);
                  };
              })(l);
          }
          l--;
      };
  
      while (l) {
          _loop();
      }
  }
  
  /**
   * 对数字进行分割
   *
   * @param {any} str
   * @param {any} section 位数
   * @param {any} separator 分割字符
   * @returns
   */
  function divisionNum(str, section, separator) {
      var section = section || 3,
          separator = separator || ",",
          reg = new RegExp('(\\d)(?=(?:\\d{' + section + '})+$)', 'g');
      str = (str + "").replace(reg, '$1' + separator);
      return str;
  }
  
  /**
   * 对不足位数进行填充
   *
   * @param {any} str
   * @param {any} section
   * @param {any} separator
   * @returns
   */
  function intercept(str, section, separator) {
      var section = section || 3,
          separator = separator || "0",
          l = (str + "").length,
          ary = new Array(section - 0 + 1).join(separator);
      if (l >= section) {
          return (str + "").substr(l - section);
      } else {
          return ary.substr(0, section - l) + str;
      }
  }
  
  /**
   * 替换原字符中的指定元素
   *
   * @param {any} str
   * @param {any} separator
   * @returns
   */
  function digita(str, separator) {
      var separator = separator || ",",
          reg = new RegExp(separator, 'g');
      return (str + "").replace(reg, "");
  }
  var num = {
      division: divisionNum,
      intercept: intercept,
      digita: digita
  };
  /**
   * 日期处理 扩展 日期处理函数
   */
  Date.prototype.format = function (str) {
      var week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
          time = {
          "y+": this.getFullYear(),
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "H+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "w": this.getDay(),
          "W": week[this.getDay()]
      },
          str = str || "yyyy-MM-dd HH:mm:ss";
      for (var i in time) {
          var reg = new RegExp('(' + i + ')', 'g');
          str = str.replace(reg, function () {
              return intercept(time[i], i == "w" || i == "W" ? time[i].length : arguments[1].length);
          });
      }
      return str;
  };
  
  /**
   * 通用处理创建树形结构数据
   *
   * @param {any} data
   * @param {any} idName
   * @param {any} parentName
   * @param {any} startValue
   * @param {any} cb
   * @returns
   */
  function creatTree(data, idName, parentName, startValue, cb) {
      var array = [],
          temp;
      for (var i = 0, l = data.length; i < l; i++) {
          if (data[i][parentName] == startValue) {
              array.push(data[i]);
              temp = creatTree(data, idName, parentName, data[i][idName], cb);
              data[i].children = temp.length > 0 ? temp : [];
              cb && cb.call(this, data[i]);
          }
      }
      return array;
  }
  
  // JSON.
  function strTojson(str) {
      return JSON.parse(str);
  }
  
  /**
   *
   * 返回当前的一个时间搓
   * @returns
   */
  function getTimestamp() {
      var timestamp = Date.parse(new Date());
      return timestamp;
  }
  
  /**
   *  设置弹窗的高度
   *  @param {id} id  最外层 id
   */
  function setMainHeight(id) {
      var bodyH = DOC.body.clientHeight,
          winH = WIN.innerHeight;
      var el = "#" + id + " >.main-wrap";
      var outEl = DOC.querySelector("#" + id);
      var dialogWrap = DOC.querySelector(el),
          elHeight = undefined,
          scrollHeight = DOC.body.scrollTop;
      outEl.style.display = "block";
      elHeight = dialogWrap.clientHeight;
      if (elHeight <= winH) {
          //弹出层高度小于等于窗口高度时
          dialogWrap.style.top = scrollHeight + (winH - elHeight) / 2 + "px";
      } else if (winH < elHeight && winH >= bodyH) {
          //弹出层高度大于窗口高度并且文档高度小于窗口高度时
          dialogWrap.style.height = winH - 40 + "px";
          dialogWrap.style.top = "20px";
      } else if (winH < elHeight && elHeight < bodyH - scrollHeight) {
          //弹出层高度大于窗口高度并且小于剩余文档高度
          dialogWrap.style.top = scrollHeight + Math.min((bodyH - scrollHeight - elHeight) / 2, 20) + "px";
      } else if (winH < elHeight && elHeight >= bodyH - scrollHeight) {
          //弹出层高度大于窗口高度并且大于剩余文档高度
          dialogWrap.style.height = bodyH - scrollHeight - 40 + "px";
          dialogWrap.style.top = scrollHeight + Math.min((winH - bodyH + scrollHeight + 40) / 2, 20) + "px";
      }
  }
  
  /**
   * 过滤同步过来的样式
   * @return {[type]} [description]
   */
  function replaceStyle(str) {
      var Reg = /style=\"[^\"]*\"/gm;
      return str.replace(Reg, " ");
  }
  
  // exports 方法
  module.exports = {
      URL: URL,
      host: HOST,
      storeValue: storeValue,
      getValue: getValue,
      deleteValue: deleteValue,
      useApi: useApi,
      linkTo: linkTo,
      moduleFactory: moduleFactory,
      num: num,
      creatTree: creatTree,
      loadImage: loadImage,
      strTojson: strTojson,
      Loading: Loading,
      getTimestamp: getTimestamp,
      setMainHeight: setMainHeight,
      replaceStyle: replaceStyle,
      d: dioE // encrypt
  
  };
  // ext: extend // 扩展

});