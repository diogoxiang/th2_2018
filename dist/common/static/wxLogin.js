/**
 * Created by Diogo on 2018年8月10日10:59:14
 */

'use strict';

require.async(['lib/vue/vue.2.13.min', 'components/common/common', 'extend', 'apiData', 'dialog'], function (Vue, app, ext, api, dialog) {

    ext.wxIntercept(function (barData, wxLogin) {
        var wxData = app.getValue('date');

        wxData = JSON.parse(decodeURIComponent(wxData));

        // 无扫码数据。提示扫码
        // if (!barData) {
        //     dialog.tipDialog("请重新扫码");
        //     return false;
        // }

        var vm = new Vue({
            el: '#app',
            data: {
                title: '微信登录'
            }
        });
        if (wxData) {
            app.storeValue('wxData', JSON.stringify(wxData), 'local');
            wxDologin();
        } else {
            dialog.tipDialog('微信授权参数不正确');
        }

        /**
         *
         * 微信登录方法
         * @param {any} data
         */
        function wxDologin() {
            // console.log('21')
            api.wxLogin(wxData.openid, window.th.comId, wxData.nickname, wxData.sex, "", "", wxData.headimgurl, wxData.province, wxData.city, wxData.unionid, 1, "", wxData.subscribe, 0).done(function (edata) {
                if (edata.code == 200) {

                    // debugger

                    // let temp = Object.assign(wxData, edata.data)

                    // fix ios8 不支持 Object 语法
                    wxData.userToken = edata.data.userToken;
                    wxData.id = edata.data.id;
                    wxData.province = edata.data.province;
                    wxData.city = edata.data.city;

                    app.storeValue('wxLogin', JSON.stringify(wxData), 'local');
                    // 跳转返回地址
                    var gourl = app.getValue("url", "session");
                    // gourl && (window.location.href = gourl)
                    if (gourl) {
                        window.location.href = gourl;
                    } else {
                        app.linkTo('index');
                    }

                    return false;
                } else {

                    dialog.tipDialog('微信授权参数不正确');
                }
            });
        }
    }, 2);
});