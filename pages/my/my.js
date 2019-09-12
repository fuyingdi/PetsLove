<<<<<<< HEAD
=======
const api = require('../../config/config.js');
var app = getApp();

>>>>>>> yangxiaolang
Page({
  data: {
    userInfo:{
      avatarUrl:"./icon/icon.jpg",
<<<<<<< HEAD
      nickName:"浪先生"
    }
  }
  
=======
      nickName:"浪先生",
      sign:"浪先生生气了"
    }
  },
  onShow:function(){
    var avatar = app.globalData.userInfo.avatar;
    var nickName = app.globalData.userInfo.nickname;
    var sign = app.globalData.userInfo.signature;
    this.setData({
      'userInfo.avatarUrl':avatar,
      'userInfo.nickName':nickName,
      'userInfo.sign':sign
    });
  }
  


>>>>>>> yangxiaolang
})