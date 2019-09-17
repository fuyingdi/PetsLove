// pages/index/index.js
const api = require('../../config/config.js');
var app = getApp();


//给postdata传的对象为
// post_id  
// avatar(url)帖子创建者的头像  
// nickname(text)  
// outline(text)长度在80个字符之内  
// picture(array)数组内容只有纯粹的String格式的url，照片不超过3张  
// visitor_number(number)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_id:"",
    postdata:[
      {
        post_id:"1",
        avatar:"../../../icon/userInfo/nickname.png",
        nickname:"yangyi",
        outline:"老司机感冒了，5555555555555555555555555555555555555555",
        picture:[
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
        ],
        visitor_number:20
      }
    ],
    page:0
  },

  onShow:function(options){
    var that = this;
    var now = new Date().getTime();
    //进入该页面时应该加载第一页
    app.petloveRequest({
      url:api.getPostInfoList,
      method:"POST",
      data:{
        page:1,
        query_time:now,
        type:1
      },
      success(res){
        //获取到第一页的数据
        var newPage = that.data.page + 1;
        that.setData({
          postdata:res.data,
          page:newPage,
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
        query_time:now,
        type:1
      },
      success(res){
        var allPage = that.data.postdata;
        var newPage = that.data.page + 1;
        allPage = allPage.concat(res.data);
        that.setData({
          postdata:allPage,
          page:newPage
        })
      },
      fail(){
        console.log("获取广场页面失败");
      }
    })
  },

  //点击进入帖子页面
  bindtapShowPost:function(e){
    wx.navigateTo({
      url:"../showPost/showPost?post_id="+ e.currentTarget.dataset.id,
    })
  }
})