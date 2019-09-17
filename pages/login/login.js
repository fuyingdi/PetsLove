// pages/login/login.js

const api = require('../../config/config.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    registered: false,
    userInfoAuthority: false,
    tip: null,
    tipIndex: 0,
    account: "",
    permit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("onLoad");
    wx.hideTabBar();
  },

  //按键获取用户信息
  bindgetUserInfo: function (e) {
    var that = this;
    // 获取用户信息
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (infoRes) {
        var userInfo = JSON.parse(infoRes.rawData);
        var userInfo = {
          account: that.data.account, //用户输入的用户名
          avatar: userInfo.avatarUrl,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city,
          gender: userInfo.gender,
          nickname: userInfo.nickName
        }
        //上传用户资料
        app.petloveRequest({
          url: api.sendUserInfoUrl,
          data: userInfo,
          method: "POST",
          success(res) {
            //获取用户信息成功后，写入用户信息信息
            app.globalData.userInfo = userInfo;
            wx.switchTab({
              url: "/pages/index/index"
            })
          },
          fail() {
            that.setData({
              tip:"上传用户信息失败"
            })
          }
        });
        console.log(infoRes.userInfo);
        that.setData({
          registered: true
        });


      }
    })






  },
  checkAccount: function (event) {
    let that = this;
    var account = event.detail.value
    let reg = /^\w[\w\d]{4,19}/
    let flag = reg.test(account)
    that.setData({
      permit: flag
    })
    if (!flag) {
      that.setData({
        tip: "用户名不合法"
      });
      return;
    }
    app.petloveRequest({
      url: api.checkAccount,
      data: {
        account: account
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        if (res.data.repeat == "false") {
          that.setData({
            permit: true,
            account:account,
            tip:""
          });
        }
        else {
          that.setData({
            permit: false,
            tip:"用户名重复"
          })
        }
      },
      fail(res) {
        that.setData({
          tip: "网络连接失败"
        })
      }
    })
  },
  checkAccountLegal: function () {
    return true;
  }
})