// pages/login/login.js

const api = require('../../config/config.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    registered:false,
    userInfoAuthority:false,
    tip:['','请输入用户名','请输入合法用户名','该用户名已重名'],
    tipIndex:0,
    account:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log("onLoad");
    wx.hideTabBar();
    let that = this;
    //通过全局变量判断是否注册过
    if(app.globalData.registered==true){
      this.setData({
        registered:true
      })
    }

    //通过storage里是否有授权标记
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            userInfoAuthority:true
          })
        }
      }
    });

    console.log("registered:"+this.data.registered);
    console.log("userloginAuthority:"+this.data.userInfoAuthority);
    //如果注册过并且已授权，则需要向开发者服务器拉取用户数据
    if(this.data.registered==true && this.data.userInfoAuthority==true){
      let that = this;
      wx.request({
        url:api.getUserInfoUrl,
        method:"POST",
        header:app.globalData.header,
        success(res_getUserInfo){
          //存入用户信息在全局数据里，并重定向至主页
          console.log("从开发者服务器获取用户信息："+res_getUserInfo.data);
          app.globalData.userInfo=res_getUserInfo.data;
          wx.redirectTo({
            url:"/pages/index/index"
          })
        }
      });
    }
  },

  //按键获取用户信息
  bindgetUserInfo:function(e){
    var that = this;
    console.log("account:"+this.account);
    if(this.data.account==""){
      this.setData({
        tipIndex:1
      })
    }else if(!this.checkAccountLegal()){
      this.setData({
        tipIndex:2
      })
    }else{
      app.petloveRequest({
        url:api.checkAccount,
        success(res){
          if(res.data.type=="success"){
            // 获取用户信息
            wx.getUserInfo({
              lang:'zh_CN',
              success: infoRes => {
                wx.request({
                  url:api.sendUserInfoUrl,
                  data:{
                    account:that.data.account,              //用户输入的用户名
                    rawData: infoRes.rawData,               // 用户非敏感信息
                    signature: infoRes.signature,           // 签名
                    encryptedData: infoRes.encryptedData,   // 用户敏感信息
                    iv: infoRes.iv                          // 解密算法的向量
                  },
                  method:"POST",
                  header:app.globalData.header,
                  success(res){
                    //获取用户信息成功后，拉取开发者服务器端存储的用户自己写入的信息
                    app.petloveRequest({
                      url:api.getUserInfoUrl,
                      method:"POST",
                      success:function(res_getUserInfo){
                        //存入用户信息在全局数据里
                        app.globalData.userInfo=res_getUserInfo.data;
                        that.setData({
                          userInfo:res_getUserInfo.data
                        });
                      }
                    })
                  },
                  fail(){
                    console.log("向开发者服务器端发送用户信息失败");
                  }
                });
                console.log(infoRes.userInfo);
                this.setData({
                  registered:true
                });
                wx.showTabBar({});
                wx.switchTab({
                  url:"/pages/index/index"
                });
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }else{
            that.setData({
              tipIndex:3
            })
          }
        },
        fail(res){
          console.log("查验失败");
        }
      })
    }
  },

  bindblurAccountInput:function(e){
    this.setData({
      account:e.detail.value
    })
  },
  checkAccountLegal:function(){
    return true;
  }
})