const app = getApp()
const api = require('../../../config/config.js');
// pages/chat/newFriend/newFriend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        infoCardAnimation: null,
        newUser: null,
        text: "",
        newUsetList: null,
        targetAccount: null  //目标添加用户
    },
    search: function () {

        let that = this;
        app.petloveRequest({
            url: api.searchUser,
            method: "POST",
            data: { text: this.data.text },
            success(res) {
                console.log(res.data)
                that.setData({
                    newUserList: res.data
                })
            }
        })

        var animation = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease',
        });

        var slide = (x = 0, opacity = 1) => {
            animation.translateX(x).opacity(opacity).step()
            that.setData({
                infoCardAnimation: animation.export()
            })
        }

        slide(500, 0);
        setTimeout(slide, 500)
    },
    addFriend: function (event) {
        app.petloveRequest({
            url: api.addNewFriend,
            method: "POST",
            data: {
                account: event.currentTarget.dataset.account
            },
            success: function (res) {
                if (res.data.type == "success") {
                    wx.showToast({
                        icon: "none",
                        title: "成功发送好友添加请求！"
                    })
                }
                else{
                    wx.showToast({
                        icon: "none",
                        title: res.data.msg
                    })
                }
            }
        })

    }
    ,
    input: function (res) {
        this.setData({
            text: res.detail.value
        })
        console.log(this.data.text)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: app.globalData.userInfo,
            newUser: app.globalData.userInfo//调试
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