const app = getApp()
const api = require('../../../config/config.js');
// pages/chat/friendRequest/friendRequest.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newUserList:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    friendRequest:function(){
        let that = this;
        app.petloveRequest({
            url:api.friendRequest,
            method:"POST",
            success:function(res){
                that.setData({
                    newUserList:res.data
                })
            }
        })
    },
    refresh:function(){
        this.friendRequest();
        wx.showToast({
            icon:"none",
            title:"成功更新！"
        })
    }
    ,
    addFriend:function(event){
        let that = this;
        app.petloveRequest({
            url:api.handleFriendRequest,
            method:"POST",
            data:{
                account1:event.currentTarget.dataset.account1,
                type:"confirm"
            },
            success(res)
            {
                if("success" == res.data.type)
                {
                    wx.showToast({
                        icon:"none",
                        title:"成功添加好友！"
                    })
                    that.friendRequest();
                }
            }
        })
    },
    rejectFriend:function(event){
        let that = this;
        app.petloveRequest({
            url:api.handleFriendRequest,
            method:"POST",
            data:{
                account1:event.currentTarget.dataset.account1,
                type:"reject"
            },
            success(res)
            {
                if("success" == res.data.type)
                {
                    wx.showToast({
                        icon:"none",
                        title:"已拒绝！"
                    })
                    that.friendRequest();
                }
            }
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
        console.log("friendRequest调试点")
        this.friendRequest();
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