var app = getApp();
const api = require('../../../config/config.js');
Page({
    data: {
        list: null,   //无序好友列表
        token: null, //发送信息时用的令牌，
        requestNumber: 0
    },
    onLoad(options) {
        
    },
    getFriendList: function () {
        let that = this;
        app.petloveRequest({
            url: api.getFriendList,
            method: "POST",
            success: function (res) {
                console.log("成功", res.data, typeof (res.data))
                var data = res.data;
                that.setData({
                    list: data
                })
            }
        })
    },
    checkFriendRequest: function () {
        let that = this;
        app.petloveRequest({
            url: api.checkFriendRequest,
            method: "POST",
            success: function (res) {
                let number = res.data.number;
                that.setData({
                    requestNumber: number
                })
                if (number > 0) {
                    app.globalData.innerAudioContext.src = '/sound/friendRequest.wav';//链接到音频的地址
                    app.globalData.innerAudioContext.play()//播放
                }
                console.log("好友请求", that.data.requestNumber)
            }
        })

    },
    refresh: function () {
        this.checkFriendRequest();
        this.getFriendList();
    },
    onShow: function () {
        this.refresh();
    },
    onHide: function () {
    }


})