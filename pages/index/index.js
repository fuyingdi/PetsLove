// pages/index/index.js
const api = require('../../config/config.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postdata:[],
    page:0
  },

  onShow:function(){
    var that = this;
    var now = new Date().getTime();
    //进入该页面时应该加载第一页
    app.petloveRequest({
      url:api.getPostInfoList,
      method:"POST",
      data:{
        page:1,
        timestamp:now,
      },
      success(res){
        //获取到第一页的数据
        that.setData({
          postdata:res.data,
          page:that.data.page+1
        })
      },
      fail(res){
        console.log("获取广场首页失败");
      }
    })
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
    var that = this;
    var now = new Date().getTime();
    app.petloveRequest({
      url:api.getPostInfoList,
      method:"POST",
      data:{
        page:that.data.page,
        timestamp:now
      },
      success(res){
        var allPage = that.data.postdata;
        allpage = allpage.concat(res.data);
        that.setData({
          postdata:allpage,
          page:that.data.page
        })
      },
      fail(){
        console.log("获取广场页面失败");
      }
    })
  },

  //点击进入帖子页面
  bindtapShowPost:function(e){
    var link = api.showPost+"?post_id="+e.currentTarget.dataset.id;
    console.log(link);
    wx.navigateTo({
      url:link
    })
  }
})