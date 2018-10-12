/**
 * Created by Diogo on 2018年8月10日10:59:14
 */

'use strict';

require.async(['lib/vue/vue.2.13.min', 'components/common/common', 'extend', 'apiData', 'dialog'], function (Vue, app, ext, api, dialog) {
    var WIN = window;
    var DOC = document;
    var HEIGTH = WIN.innerHeight > 0 ? WIN.innerHeight : DOC.documentElement.clientHeight;
    var imgArray = [];
    var themsg = app.getValue('msg') || app.getValue('result');
    var type = app.getValue('type') || 0;
    // TODO:  临时复制用
    var iso = app.getValue('o');
    if (iso) {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            //通过下面这个API显示右上角按钮
            WeixinJSBridge.call('showOptionMenu');
        });
        document.body.innerHTML = "debugger模式 , 复制 URL(删除o=1参数) 到模拟器上打开,可进行模拟器调式";
        return false;
    }

    if (!themsg) {
        dialog.tipDialog('请确认参数');
        return false;
    }
    // ---
    var vm = new Vue({
        el: '#app',
        data: {
            screenH: HEIGTH,
            title: '微信登录',
            userinfo: "",
            activityId: "",
            process: 0 // 整体的进度
        },
        mounted: function mounted() {
            console.log("object");
            vm = this;
            // console.log(encodeURIComponent(WIN.location.href));

            vm.userLoginRegister();

            console.log(imgArray);
        },
        methods: {

            /**
             * [userLoginRegister description]
             * @param  {[type]} )={                                 } [description]
             * @param  {[type]} getActivityInfo [description]
             * @return {[type]}                 [description]
             */
            userLoginRegister: function userLoginRegister() {
                api.userLoginRegister(themsg, type, 2).done(function (res) {
                    if (res.code == 200) {
                        app.storeValue("wxLogin", JSON.stringify(res.data), 'local');

                        vm.userinfo = res.data;
                        vm.activityId = res.data.activityId;
                        // vm.getActivityInfo(res.data.token)
                        var eurl = app.getValue('url', 'session');
                        if (eurl) {
                            //  app.linkTo('index');
                            window.location.href = eurl;
                        } else {
                            app.linkTo('index');
                        }

                        // console.log(res);
                    } else {
                            res.msg && dialog.tipDialog(res.msg);
                        }
                });
            },

            goTolink: function goTolink(url) {
                return false;
            },
            loadingPic: function loadingPic() {
                app.loadImage(imgArray, function (res) {
                    console.log(res);
                    var pross = res / imgArray.length * 100;
                    vm.process = pross.toFixed(0);

                    if (vm.process == 100) {
                        // that.isShowStart = true;
                        window.location.href = 'h5.html';
                        return false;
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        }
    });
});