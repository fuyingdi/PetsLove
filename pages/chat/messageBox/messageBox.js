var app = getApp();
const api = require('../../../config/config.js');
// pages/chat/chatBox/chatBox.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        item: {
            avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ermfT5EZEtiaDDywwMDMUfabxnTJVd53PQOCL2iafrQmoxvKFbEQaviatSt5Ih5iaiaicjDbXrnHdvUhicHQ/132",
            nickname: "王伟",
            msg: "你好！",
            number: 3
        },
        messageBoxData: 0
    },
    startChat: function (res) {
        let to = res.currentTarget.dataset.to;
        to.account = to.from
        wx.navigateTo({
            url: '../chatFrame/chatFrame',
            events: {
                to: function (data) {
                }
            },
            success: function (res) {
                res.eventChannel.emit("to", to)
            }
        })
    },
    delete:function(res){
        let to = res.currentTarget.dataset.to;
        let from = to.from;
        wx.showActionSheet({
            itemList: ['删除'],
            success (res) {
                switch(res.tapIndex)
                {
                    case 0:
                        app.globalData.messageBoxData[from] = null;
                        wx.setStorageSync("messageBoxData", app.globalData.messageBoxData);
                        app.Tip("已删除");
                        wx.reLaunch({
                            
                          })
                }
            },
            fail (res) {
            }
          })
    },
    onMessageBox:function(){
        let that = this;
        console.log("messageBoxjs打开消息监听")
        app.globalData.websocket.task.onMessage(function (res) {
            //强制JSON化
            let message = JSON.parse(res.data);
            that.setData({
                messageBoxData: app.globalData.messageBoxData
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
            userInfo: app.globalData.userInfo
        })
        console.log(app.globalData.userInfo);
        console.log(this.data.userInfo)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            messageBoxData: app.globalData.messageBoxData
        });
        this.onMessageBox();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})