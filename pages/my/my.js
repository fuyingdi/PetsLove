const api = require('../../config/config.js');
var app = getApp();

Page({
  data: {
    userInfo: {}
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },



})