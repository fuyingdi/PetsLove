// pages/showPost/showPost.js

const api = require('../../config/config.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{},
    floorList:[],
    inputSectionBottom:0,
    replyFloor:"",
    actualReply:0,
    inputFocus:false,
    inputMessage:"",
    page:1,
    inputHolder:"",
  },

  onLoad: function (options) {
    var that = this;
    var now = new Date().getTime();
    var nextPage = this.data.page + 1;
    var options_id = options.post_id;
    app.petloveRequest({
      url:api.getPost,
      method:"POST",
      data:{
        post_id:options_id,
        type:1
      },
      success(res){
        that.setData({
          postData:res.data,
          replyFloor:res.data.post_id,
          inputHolder:"评论点赞，都要勇往直前~"
        })
      },
      fail(){
        console.log("showPost获取帖子内容失败");
      }
    });
    app.petloveRequest({
      url:api.getFloorList,
      method:"POST",
      data:{
        post_id:options_id,
        query_time:now,
        page:1,
        type:1
      },
      success(res){
        that.setData({
          floorList:res.data,
          page:nextPage
        })
      },
      fail(res){
        console.log("showPost首次加载回复失败");
      }
    })
  },

  onReachBottom: function () {
    var that = this;
    var oldList = that.data.floorList;
    var nextPage = that.data.page + 1;
    var now = new Date().getTime();
    app.petloveRequest({
      url:api.getFloorList,
      method:"POST",
      data:{
        post_id:that.data.postData.post_id,
        query_time:now,
        page:that.data.page,
        type:1
      },
      success(res){
        var newList = oldList.concat(res.data);
        that.setData({
          floorList:newList,
          page:nextPage
        })
      },
      fail(res){
        console.log("showPost之后加载回复失败");
      }
    })
  },

  onUnload:function(){
    console.log("退出showPost");
  },
  //点击楼层回复时调用
  bindtapReply:function(e){
    var tip = "回复给"+e.currentTarget.dataset.citename+"：";
    this.setData({
      replyFloor:e.currentTarget.dataset.floorid,
      inputFocus:true,
      inputHolder:tip,
    })
  },
  //
  bindblurInput:function(e){
    this.setData({
      inputSectionBottom:0,
      actualReply:this.data.replyFloor,
      replyFloor:"",
      inputHolder:"评论点赞，都要勇往直前~",
    })
  },
  //聚焦输入框时调用
  bindfocusInput:function(e){
    //设置输入框bottom将其拉起
    this.setData({
      inputSectionBottom:e.detail.height
    })
  },
  //发送回复
  bindtapSendReply:function(e){
    var that = this;
    //向服务器发送回复内容
    app.petloveRequest({
      url:api.addFloor,
      method:"POST",
      data:{
        post_id:that.data.postData.post_id,
        content:that.data.inputMessage,
        cite_id:that.data.actualReply,
        type:"1"
      },
      success(res){
        console.log("回复成功");
      },
      fail(res){
        console.log("回复失败");
      }
    })
    //清空收回输入框
    this.setData({
      actualReply:0,
      inputSectionBottom:0,
      replyFloor:"",
      inputMessage:"",
      page:1,
      inputHolder:"评论点赞，都要勇往直前~",
    })
    //更新显示的回复
    var nextPage = that.data.page + 1;
    var now = new Date().getTime();
    app.petloveRequest({
      url:api.getFloorList,
      method:"POST",
      data:{
        post_id:that.data.postData.post_id,
        query_time:now,
        page:1,
        type:1
      },
      success(res){
        that.setData({
          floorList:res.data,
          page:nextPage
        })
      },
      fail(res){
        console.log("showPost首次加载回复失败");
      }
    })
  },

  bindInputMsg:function(e){
    this.setData({
      inputMessage:e.detail.value,
    })
  }
})