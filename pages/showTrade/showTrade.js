var app = getApp();
const api = require('../../config/config.js');

// pages/showTrade/showTrade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeData: {
      account: "yanghaoxin",
      content: "性感可爱，姿势多样，能在寒冷的冬夜用微笑温暖你的心。",
      bleed: "柴犬",
      price: "5000",
      picture: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568287118657&di=ca1342c524774fa6092a286d6f588e9b&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F40%2Fw480h360%2F20181018%2FEgPv-hmrasqr9643417.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
      ]
    }
  },
  //点击与卖家私聊
  bindtapChat: function () {

    app.petloveRequest({
      url: api.getUserInfoById,
      data: {
        toAccount: this.data.tradeData.account
      },
      success: function (res) {
        var to = res.data
        console.log(to)
        wx.navigateTo({
          url: '../chat/casualChatFrame/casualChatFrame',
          events: {
            to: function (data) {}
          },
          success: function (res) {
            res.eventChannel.emit("to", to)
          }
        })
      }
    })


    // let to = res.currentTarget.dataset.to;
    // console.log(res)
    // wx.navigateTo({
    //     url: '../chatFrame/chatFrame',
    //     events: {
    //         to: function (data) {
    //         }
    //     },
    //     success: function (res) {
    //         res.eventChannel.emit("to", to)
    //     }
    // })
  },


})