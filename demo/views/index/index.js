/**
 * Created Dio 2018年8月10日10:59:1
 * */
require(["vue", "common", "extend", "apiData", "dialog", "wx"], function (Vue, app, ext, api, dialog, wx) {
  let WIN = window;
  let DOC = document;
  const HEIGTH = WIN.innerHeight > 0 ? WIN.innerHeight : DOC.documentElement.clientHeight;

  // 当天0点的时间搓
  let timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
  // 活动介绍
  let ruleIntroduce = `
      “
    一、活动对象<br/>
    “一品黄山天高云淡”公众号所有粉丝、商城用户。<br/>
    二、活动范围<br/>
    全国开展。<br/>
    三、活动品牌<br/>
    大红方印、红方印1755、喜庆红方印细支、软喜庆红方印、喜庆红方印、红方印细支、都宝冰爽世界、黄山松（回味迎客松）、小红方印、徽商新概念细支、徽商新视界细支、黄山松（迎客松赢客）、记忆、最美高铁、黄山（黑马）、黄山前店后坊中支、前店后坊细支等17个规格附码产品。<br/>
    四、活动形式<br/>
    （一）活动一：【扫码点灯·赢惊喜】<br/>
    活动时间：9月22日—10月7日<br/>
    扫描安徽中烟旗下本次活动指定规格任意一款带有二维码的产品（条盒、烟包包装内），点亮花灯，即可获得“华为P20手机、京东E卡、话费、红包、徽宝”其中一项奖励。<br/>
    （二）活动二：【扫码竞赛·抢大奖】<br/>
    活动时间：9月22日—10月7日<br/>
    参与扫码活动完成验真即可参与扫码大比拼，扫描烟包得1积分，扫描条盒得2积分。活动结束后，总积分排名前100名用户均可获得精美礼品，最高可获得华为P20手机。<br/>
    （三）活动三：【共制花灯·贺中秋】<br/>
    1.活动时间：2018年9月22日—2018年9月24日。<br/>
    3.活动形式：用户进入制作花灯界面，选择花灯模型和吊带，制作完成后邀请好友进行点亮，每个好友只能点亮一次，活动结束后，获得点亮次数最多的前100名用户可以获得精美礼品。<br/>
    （四）活动四：【拼图比赛·博好礼】<br/>
    1.活动时间：9月22日-10月7日<br/>
    2.活动形式：登录“一品黄山天高云淡”微信公众号菜单栏“活动中心”参与“双节拼拼乐”游戏，活动结束后，每周用时最短的前100名用户均有惊喜好礼，最高奖励价值500元京东E卡。<br/>
    五、客服热线：400-8389-315（周一至周五8:30-17:30）。<br/>
    六、本活动的最终解释权归安徽中烟工业有限公司所有。<br/>
    七、活动及页面中包含少量烟草的相关信息，未满18岁者不得参与本次活动。<br/>
  `
  // ----
  ext.wxIntercept((barData, wxLogin) => {
    // 无扫码数据。与wx登录数据。 则去登录
    // (!barData || !wxLogin) && ext.wxWarranty()

    let vm = new Vue({
      el: "#app",
      data: {
        pagetitle: "",
        styleObject: {
          height: HEIGTH + 'px',
          // background: "url('" + indexbg + "') center no-repeat",
          // backgroundSize: '100% 100%'
        },
        isPage: 1, // 第几页
        isErrmsg: false,
        serversTime: '', // 服务器时间
        sTime: '', // 开始时间
        eTime: '', // 活动结束时间
        ruleTxt: ruleIntroduce, // 活动说明
        remarks: '', // 提示语句
        userinfo: "",
        activityId: "", // 活动id
        activityInfo: '', // 活动信息
        isHaveRankAward: '', //
        isShowSelect: false,
        loadpic: true, // 默认是打开的
        showRank: false, // 排行榜
        showRule: false, // 规则
        showMask: false, // 蒙版

        actState: 2 //  actState 1 是活动已结束 0 是活动未开始 2是活动进行中
      },
      mounted: function () {
        let that = this;
        vm = this;

        // DOC.title = "中秋拼拼乐";

        // 一个按钮
        // ext.popup('', `活动未开始 <br>活动时间111`, function () {
        //   // app.linkTo('ucenter')
        //   console.log("sure");
        // },function(){
        //     console.log("cancel");
        // }, 1);

        // ext.popup('', `<strong>恭喜你</strong><br/> 活动未开始 <br>活动时间111`, function () {
        //   // app.linkTo('ucenter')
        //   console.log("sure");
        // },function(){
        //     console.log("cancel");
        // }, 2);

        console.log(wxLogin);
        vm.userinfo = wxLogin;

        // let token ="1864d8e9ea50bf643c0e43e87e933d14d68c0ec4650956db880d1cbf535a6ba2c3655d015965d91d9804b61e312b839d50c4474c011e59eb916aad94320a38f9";

        // vm.showRule = true;

        if (window.th.status == 'on') {

          that.getActivityIdForAvtivityList();
        }
        that.getSdk()


      },
      // 计算后的值
      computed: {

      },
      methods: {
        /** [clickBtn description] */
        clickBtn: (str) => {
          switch (str) {
            case 'rule':
              vm.showMask = true;
              vm.showRule = true;
              break;
            case 'rank':
              vm.queryPluzzleRankList();

              break;
          }
        },
        /** [closedPop description] */
        closedPop: () => {
          vm.showMask = false;
          vm.showRule = false;

        },
        /**
         * 显示活动规则
         */
        showRulePop: () => {
          vm.showMask = true;
          vm.showRule = true;
        },
        /**
         * 跨目录跳转
         */
        goTolink: (eurl, obj, loc) => {

          if (window.th.status == "off") {
            dialog.tipDialog("活动暂未开启")
            return false
          }
          // 活动已经结束
          if(obj.game == 2){
             app.linkTo(eurl, obj, loc);
             return false
          }

          // 检测
          if (obj.status == 2004) {
            dialog.tipDialog('活动已结束')
            return false
          } else if (obj.status != 0) {

            dialog.tipDialog('活动异常,请查看配置')
            return false
          }


          app.linkTo(eurl, obj, loc);

        },
        /**
         * 获取信息列表
         */
        getActivityIdForAvtivityList: () => {

          api.getActivityIdForAvtivityList(2).done(res => {
            // console.log(res);
            if (res.code == 200) {
              /**
               * lenternStatus:2004     // 0 为正常  
               * lenternactivityId:23    // 制灯活动id
               * pluzzleStatus:2004      // 0 为正常
               * pluzzleactivityId:21    // 拼图活动
                 scanStatus:2004          //  0 为正常
                 scanlotteryactivityId:"22" // 扫码活动ID
               */

              vm.activityInfo = res.data;

              app.storeValue('activityInfo', JSON.stringify(res.data), 'local')

            } else {
              dialog.tipDialog(res.msg)
            }

          })


        },
        getSdk: () => {
          let eurl = window.location.href;


          api.getJssdk(eurl).done(res => {
            console.log(res);
            if (res.code == 200) {

              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名，见附录1
                jsApiList: ["showMenuItems", "hideMenuItems", "onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });


              wx.ready(function () {
                // 先显示可分享的按钮
                wx.showMenuItems({
                  menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"] // 要显示的菜单项，所有menu项见附录3
                });

                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.hideMenuItems({
                  menuList: ["menuItem:share:brand", "menuItem:share:email", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:originPage", "menuItem:readMode"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });


                wx.onMenuShareAppMessage({
                  title: "" + window.th.shareTitle,
                  link: "" + window.th.hosturl + window.th.shareUrl,
                  desc: "" + window.th.shareDesc,
                  imgUrl: "" + window.th.hosturl + window.th.shareImg

                });
                wx.onMenuShareTimeline({
                  title: "" + window.th.shareTitle,
                  link: "" + window.th.hosturl + window.th.shareUrl,
                  desc: "" + window.th.shareDesc,
                  imgUrl: "" + window.th.hosturl + window.th.shareImg
                });


              });



            } else {

              dialog.tipDialog(res.msg)
            }



          })



        }




      }

    });
    // end Vue
  }, 2);
  // end wxIntercept
});