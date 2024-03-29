const api = require('../../config/config.js');
var app = getApp();

Page({
  data: {
    modifiedFlag: false,
    userInfo: {},
    genderrange: ['女', '男'],
    wordCount: 0
  },
  onLoad: function () {
    console.log("onLoad");
    if (!app.globalData.userInfo)
      return;
    console.log("not null");
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo);
    if (this.data.userInfo.signature)
      this.setData({
        wordCount: this.data.userInfo.signature.length
      })

  },

  //在切入其它页面时，如modifiedFlay为true，即信息被更改过
  //将更改过的信息存入app.js和storage,并发往开发者服务器
  onHide: function () {

  },

  onUnload: function () {
    console.log("onUnload");
    let that = this;
    if (this.data.modifiedFlag) {
      console.log("flag:" + this.data.modifiedFlag);
      //将用户信息存入app.js
      app.globalData.userInfo = this.data.userInfo;
      console.log("++++++++++")
      console.log(this.data.userInfo)
      console.log(JSON.stringify(this.data.userInfo))
      //向开发者发送更改后的用户信息
      console.log(that.data.userInfo);
      console.log(typeof (that.data.userInfo))
      app.petloveRequest({
        url: api.modifyUserInfo,
        method: "POST",
        data: that.data.userInfo,
        success: function (res) {
          that.setData({
            modifiedFlag: false
          })
        },
        fail: function (res) {
          console.log("更新用户输入信息失败");
        }
      })
    }
  },


  //picker选择所在城市
  bindchangeRegion: function (e) {
    let country = 'userInfo.country';
    let province = 'userInfo.province';
    let city = 'userInfo.city';
    this.setData({
      region: e.detail.value,
      [country]: e.detail.value[0],
      [province]: e.detail.value[1],
      [city]: e.detail.value[2],
    });
    this.modified();
  },

  //picker选择生日
  bindchangeBirthday: function (e) {
    //这种赋值法可用于对象和数组赋值
    let birthday = 'userInfo.birthday';
    this.setData({
      [birthday]: e.detail.value
    });
    this.modified();
  },

  //picker选择性别
  bindchangegender: function (e) {
    let gender = 'userInfo.gender';
    this.setData({
      [gender]: e.detail.value
    });
    this.modified();
  },

  //input输入昵称
  bindblurNickname: function (e) {
    let nickname = 'userInfo.nickname';
    this.setData({
      [nickname]: e.detail.value
    });
    this.modified();
  },

  //input输入email
  bindblurEmail: function (e) {
    let email = 'userInfo.email';
    this.setData({
      [email]: e.detail.value
    });
    this.modified();
  },
  //input输入signature
  bindblurSignature: function (e) {
    let signature = 'userInfo.signature';
    this.setData({
      [signature]: e.detail.value
    });
    this.modified();
    // console.log("wandan");
  },

  checkWordsCount: function (e) {
    var count = e.detail.cursor;
    this.setData({
      wordCount: count
    });
  },

  modifyAvatar: function (e) {
    var that = this;
    var useravatar = 'userInfo.avatar';
    console.log(this.data.userInfo)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempPhotopath = res.tempFilePaths[0];
        console.log(res.tempFilePaths[0]);
        wx.uploadFile({
          url: api.changeAvatar,
          filePath: tempPhotopath,
          name: 'file',
          header: app.globalData.header,
          success: function (uploadRes) {
            console.log(uploadRes.data)
            if (uploadRes.type == "error") {
              wx.showToast({
                icon: "none",
                title: uploadRes.msg
              })
            } else {
              wx.showToast();

              console.log(uploadRes['data'])
              // console.log(JSON.parse(uploadRes['data'])['avatar'])
              var avatar = JSON.parse(uploadRes['data'])['avatar']
              that.setData({
                [useravatar]: avatar
              })
            }
          }
        })
      }

    })

  },


  modified: function () {
    this.setData({
      modifiedFlag: true
    })
  }
})