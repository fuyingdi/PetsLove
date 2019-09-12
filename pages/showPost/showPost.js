// pages/showPost/showPost.js

const api = require('../../config/config.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{
      picture:[
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
      
      ],
    },
    floorList:[],
    inputSectionBottom:0,
    replyFloor:0,
    inputFocus:false,
    inputMessage:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onUnload:function(){
    console.log("退出showPost");
  },
  //点击楼层回复时调用
  bindtapReply:function(e){
    this.setData({
      replyFloor:e.currentTarget.id,
      inputFocus:true
    })
    console.log("reply:"+this.data.replyFloor);
  },
  //聚焦输入框时调用
  bindfocusInput:function(e){
    //设置输入框bottom将其拉起
    this.setData({
      inputSectionBottom:e.detail.height
    })
  },
  //失去焦点
  bindblurInput:function(){
    //设置输入框bottom为0，收回输入框到底部
    //将回复的楼层清空为0
    this.setData({
      inputSectionBottom:0,
      replyFloor:0
    })
  },
  //发送回复
  bindtapSendReply:function(){
    //向服务器发送回复内容
    // app.petloveRequest({

    // });

    //清空收回输入框
    this.setData({
      inputSectionBottom:0,
      replyFloor:0,
      inputMessage:""
    })
  }
})