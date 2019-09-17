
// pages/chat/chatFrame/chatFrame.js
var app = getApp()
const api = require('../../../config/config.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        to: null,
        userInfo: null,
        record: [],
        newPosition: "",
        input_content: ""
    },
    inputTap: function (e) {
        this.setData({
            input_content: e.detail.value
        })
    },
    getHisInfo:function(){
        let that = this;
        wx.navigateTo({
            url: '/pages/chat/hisInfo/hisInfo',
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              userInfo: function(data) {
                console.log(data)
              }
            },
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('userInfo', that.data.to)
            }
          })
    },
    actionSheet: function () {
        let that = this;
        var tip = (content) => {
            wx.showToast({
                icon: "none",
                title: content
            })
        }
        wx.showActionSheet({
            itemList: ['清空聊天记录', '添加好友'],
            success(res) {
                switch (res.tapIndex) {
                    case 0:
                        wx.setStorageSync("record" + that.data.to.account, []);
                        that.setData({
                            record: []
                        })
                        wx.showToast({
                            icon: "none",
                            title: "已清空聊天记录！"
                        })
                        break;
                    case 1:
                        wx.showModal({
                            title: '提示',
                            content: '确认添加好友吗',
                            success(res) {
                                if (res.confirm) {
                                    app.petloveRequest({
                                        url: api.handleFriendRequest,
                                        method: "POST",
                                        data: {
                                            account1: that.data.to.account,
                                            type: "delete"
                                        },
                                        success: function (res) {
                                            if (res.data.type == "success") {
                                                tip("已添加好友！");
                                                wx.setStorageSync("record" + that.data.to.account, []);
                                                wx.reLaunch({
                                                    url:"/pages/chat/friendList/friendList"
                                                })
                                            }
                                            else {
                                                tip("网络连接异常！");
                                            }
                                        }
                                    });
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })

                        break;
                    default: break;
                }
            },
            fail(res) {
            }
        })
    },
    getRecordFromStorage: function () {
        let that = this;
        try {
            var arr = wx.getStorageSync("record" + that.data.to.account)
            console.log(arr, "打印纯缓存")
            if (arr) {
                that.setData({
                    record: arr
                })
            }
        } catch (e) {
            // Do something when catch error
            console.log(e)
            console.log(that.data.record, "打印缓存record")
        }
        this.refreshPosition();
    },
    clearBubble: function () {
        let that = this;
        var messageBoxData = app.globalData.messageBoxData;
        if (messageBoxData) {
            let to = that.data.to.account;
            if (messageBoxData[to]) {
                messageBoxData[to].number = 0;
            }
            try {
                wx.setStorageSync("messageBoxData", messageBoxData);
            }
            catch (e) {
                console.log(e)
            }
            app.globalData.messageBoxData = messageBoxData;
        }
        wx.setStorageSync("messageBoxData",app.globalData.messageBoxData)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        this.setData({
            userInfo: app.globalData.userInfo
        })
        let eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('to', function (to) {
            that.setData({
                to: to
            })
        })

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
        this.getRecordFromStorage();
        this.receiveMessage();
        this.clearBubble();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.clearBubble();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.clearBubble();
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

    },
    pushMyMessageToStorage: function (message) {
        try {
            var arr = wx.getStorageSync("record" + message.to)
            if (!arr) {
                arr = []
            }
            arr.push(message)
            console.log("pushMyMessageToStorage")
        } catch (e) {
            // Do something when catch error
            console.log(e)
        }
        try {
            wx.setStorageSync("record" + message.to, arr)
        }
        catch (e) { console.log(e) }
    },
    sendMessage: function () {
        let that = this;
        if (that.data.input_content == "") {
            wx.showToast({
                icon: "none",
                title: "内容不能为空"
            })
            return;
        }
        //聊天信息实例
        let message = {
            from: that.data.userInfo.account,
            to: this.data.to.account,
            msg: that.data.input_content,
            nickname: app.globalData.userInfo.nickname,
            avatar: app.globalData.userInfo.avatar
        }
        app.globalData.websocket.task.send({
            data: JSON.stringify(message),
            success: function (res) {
                console.log(res)
                that.data.record.push(message)
                that.setData({
                    record: that.data.record,
                    input_content: ""
                })
                that.pushMyMessageToStorage(message)
            },
            fail: function () {
                app.Tip("发送失败!")
            }
        })
        this.refreshPosition();
    },
    receiveMessage: function () {
        let that = this;
        console.log("打开消息监听")
        app.globalData.websocket.task.onMessage(function (res) {
            //强制JSON化
            let message = JSON.parse(res.data);
            if (message.from == that.data.to.account) {
                that.data.record.push(message);
                that.setData({
                    record: that.data.record
                })
                //消息置底
                that.refreshPosition();
            }
            else {
                app.showChatMessage(message);
                that.clearBubble(message);
            }

            // try {
            //     wx.setStorageSync("record" + message.from, that.data.record)
            // }
            // catch (e) { console.log(e) }
        })
    },
    refreshPosition: function () {
        let action = () => {
            let that = this;
            let position = 'msg' + (that.data.record.length - 1);
            that.setData({
                newPosition: position
            })
        }
        setTimeout(action, 500)
    }
})