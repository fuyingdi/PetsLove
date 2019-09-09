//app.js
const api = require('./config/config.js');



App({
    // 小程序启动生命周期
    onLaunch: function () {
        let that = this;
        // 检查登录状态
        that.checkLoginStatus();
    },

    // 检查本地 storage 中是否有登录态标识
    checkLoginStatus: function () {
        let that = this;
        if(this.globalData.registered == false){
            this.doLogin();
        }
    },

    // 登录动作
    doLogin: function (callback = () => {}) {
        let that = this;
        wx.login({
            success: function (loginRes) {
                if (loginRes.code) {
                    //打印code
                    console.log(loginRes.code);
                    wx.request({
                        url:api.sendCodeUrl,
                        data:{
                            code:loginRes.code
                        },
                        method:"POST",
                        //向服务器发送code成功，接收自定义用户态
                        success(res){
                            console.log("sendCode response:");
                            console.log(res.data);
                            if(res.data.type==="success"){
                                that.globalData.registered = true;
                            }
                            that.globalData.header.cookie = 'JSESSIONID=' + res.data.session_id;
                        }
                    })
                } else {
                    // 获取 code 失败
                    console.log('登录失败');
                    console.log('调用wx.login获取code失败');
                }
            },

            fail: function (error) {
                // 调用 wx.login 接口失败
                console.log('wx.login接口调用失败');
                console.log(error);
            }
        });
    },

    // 检查用户信息授权设置
    checkUserInfoPermission: function (callback = () => { }) {
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.openSetting({
                        success: function (authSetting) {
                            console.log(authSetting)
                        }
                    });
                }
            },
            fail: function (error) {
                console.log(error);
            }
        });
    },
    
    //封装了带有session_id的request请求
    petloveRequest:function(data){
        wx.request({
            url:data.url,
            method:data.method,
            header:this.globalData.header,
            success:function(res){
                if(data.success){
                    data.success(res);
                }
            },
            fail:function(res){
                if(data.fail){
                    data.fail(res);
                }
            }
        })
    },
    
    // app全局数据
    globalData: {
        userInfo: {},
        header:{'cookie':''},
        registered:false,
    }
});