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
    tip: ['', '请输入用户名', '请输入合法用户名', '该用户名已重名'],
    tipIndex: 0,
    account: ""
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
    console.log("account:" + this.data.account);
    if (this.data.account == "") {
      this.setData({
        tipIndex: 1
      })
    } else if (!this.checkAccountLegal()) {
      this.setData({
        tipIndex: 2
      })
    } else {
      app.petloveRequest({
        url: api.checkAccount,
        data: {
          account:that.data.account
        },
        method: "POST",
        success(res) {
          console.log("repeat"+res.data.repeat);
          if (res.data.repeat == "false") {
            // 获取用户信息
            wx.getUserInfo({
              lang: 'zh_CN',
              success: infoRes => {
                wx.request({
                  url: api.sendUserInfoUrl,
                  data: {
                    account: that.data.account,              //用户输入的用户名
                    rawData: infoRes.rawData,               // 用户非敏感信息
                    signature: infoRes.signature,           // 签名
                    encryptedData: infoRes.encryptedData,   // 用户敏感信息
                    iv: infoRes.iv                          // 解密算法的向量
                  },
                  method: "POST",
                  header: app.globalData.header,
                  success(res) {
                    //获取用户信息成功后，拉取开发者服务器端存储的用户自己写入的信息
                    app.petloveRequest({
                      url: api.getUserInfoUrl,
                      method: "POST",
                      success: function (res_getUserInfo) {
                        //存入用户信息在全局数据里
                        app.globalData.userInfo = res_getUserInfo.data;
                        that.setData({
                          userInfo: res_getUserInfo.data
                        });
                      }
                    })
                  },
                  fail() {
                    console.log("向开发者服务器端发送用户信息失败");
                  }
                });
                console.log(infoRes.userInfo);
                that.setData({
                  registered: true
                });
                wx.showTabBar({});
                wx.switchTab({
                  url: "/pages/index/index"
                });
                
              }
            })
          } else {
            that.setData({
              tipIndex: 3
            })
          }
        },
        fail(res) {
          console.log("查验失败");
        }
      })
    }
  },

  bindblurAccountInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  checkAccountLegal: function () {
    return true;
  }
})