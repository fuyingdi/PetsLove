//app.js
const api = require('./config/config.js');



App({
    // 小程序启动生命周期
    onLaunch: function () {
        let that = this;
        // 检查登录状态
        that.checkLoginStatus();
        this.globalData.innerAudioContext = wx.createInnerAudioContext(); //新建一个createInnerAudioContext();


    },

    onShow: function () {
        let that = this;
        // wx.switchTab({
        //     url: "/pages/index/index"
        // })
        if (that.globalData.userInfo) {
            setTimeout(that.connectChatServer, 1000)
            setTimeout(that.receiveMessage, 1500)
            that.checkMessageBoxFromStorage();
        }
    },
    /******************************************************************************************************* */
    // 检查本地 storage 中是否有登录态标识
    checkLoginStatus: function () {
        let that = this;
        if (this.globalData.registered == false) {
            this.doLogin();
        }
    },
    /******************************************************************************************************* */
    showChatMessage: function (message) {
        wx.showToast({
            icon: "none",
            title: message.nickname + ":" + message.msg
        });
    },
    addMessageToBox(message) {
        let that = this;
        let from = message.from
        if (that.globalData.messageBoxData[from]) {
            console.log("now is not null!!!")
            let number = parseInt(that.globalData.messageBoxData[from].number);
            message.number = number + 1;
            that.globalData.messageBoxData[from] = message;
        } else {
            console.log("now is null!!!")
            message.number = 1;
            that.globalData.messageBoxData[from] = message;
        }
        console.log("addMessageToBox总盒子", that.globalData.messageBoxData)
        wx.setStorageSync("messageBoxData", that.globalData.messageBoxData)
    },
    checkMessageBoxFromStorage: function (from) {
        let that = this;
        let messageBoxData = wx.getStorageSync("messageBoxData");
        if (messageBoxData) {
            that.globalData.messageBoxData = messageBoxData;
        } else {
            that.globalData.messageBoxData = {};
        }
    },
    getToken: function () {
        this.petloveRequest({
            url: api.getToken,
            method: "POST",
            success: function (res) {
                console.log("令牌是", res.data.token)
            }
        })
    },
    /********************************************************BEGIN******************************************/
    connectChatServer: function () {
        let that = this;
        that.globalData.websocket.task = wx.connectSocket({
            url: api.chatServer,
            header: this.globalData.header,
            success: function () {}
        })
        console.log("连接websocket完成",that.globalData.websocket.task);
        console.log("连接的是", that.globalData.websocket.task)
        that.globalData.websocket.task.onOpen(function (res) {
            console.log(res, "Open websocket完成")
        });
    },
    /*********************************************************END***************************************************************/
    // 登录动作
    doLogin: function (callback = () => {}) {
        let that = this;
        wx.login({
            success: function (loginRes) {
                if (loginRes.code) {
                    //打印code
                    console.log(loginRes.code);
                    wx.request({
                        url: api.sendCodeUrl,
                        data: {
                            code: loginRes.code
                        },
                        method: "POST",
                        //向服务器发送code成功，接收自定义用户态
                        success(res) {
                            console.log("sendCode response:");
                            console.log(res.data);
                            that.globalData.header.cookie = 'JSESSIONID=' + res.data.session_id;
                            console.log("=========================================================================", that.globalData.header.cookie)
                            if (res.data.type === "success") {
                                that.globalData.registered = true;
                                that.petloveRequest({
                                    url: api.getUserInfoUrl,
                                    method: "POST",
                                    header: that.globalData.header,
                                    success(res_getUserInfo) {
                                        //存入用户信息在全局数据里，并重定向至主页
                                        console.log("从开发者服务器获取用户信息：",res_getUserInfo);
                                        that.globalData.userInfo = res_getUserInfo.data;
                                        /*********************************************************BEGIN***************************************************************/
                                        /*      连接websocket       */
                                        // setTimeout(that.getToken, 1000)
                                        // setTimeout(that.connectChatServer, 1000)
                                        // setTimeout(that.receiveMessage, 1500)
                                        that.connectChatServer();
                                        that.receiveMessage();
                                        that.globalData.websocket.hasConnected = true;
                                        that.checkMessageBoxFromStorage();
                                        /*********************************************************END*****************************************************************/
                                        // wx.navigateTo({
                                        //     url: "/pages/chat/messageBox/messageBox"
                                        //     url: "/pages/chat/friendList/friendList"
                                        // })
                                        /*********************************************************END*****************************************************************/

                                        /*      跳到使用页面            */
                                        wx.switchTab({
                                            url: "/pages/index/index"
                                        })
                                    }
                                });
                            } else {
                                wx.navigateTo({
                                    url: "/pages/login/login"
                                })
                            }
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
    checkUserInfoPermission: function (callback = () => {}) {
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
    /********************************************************BEGIN******************************************/
    pushMessageToStorage: function (message) {
        try {
            var arr = wx.getStorageSync("record" + message.from)
            if (!arr) {
                arr = []
            }
            arr.push(message)
        } catch (e) {
            // Do something when catch error
            console.log(e)
        }
        try {
            wx.setStorageSync("record" + message.from, arr)
        } catch (e) {
            console.log(e)
        }
    },
    receiveMessage: function () {
        let that = this;
        console.log("appjs打开消息监听")
        that.globalData.websocket.task.onMessage(function (res) {


            that.globalData.innerAudioContext.src = '/sound/chatMessage.wav'; //链接到音频的地址
            that.globalData.innerAudioContext.play() //播放

            //强制JSON化
            let message = JSON.parse(res.data);
            var arr = null;
            that.pushMessageToStorage(message);
            that.showChatMessage(message);
            that.addMessageToBox(message);


        })
    },
    /********************************************************END******************************************/
    //封装了带有session_id的request请求
    petloveRequest: function (data) {
        console.log("fuck" + data.data);
        wx.request({
            url: data.url,
            method: data.method,
            header: this.globalData.header,
            data: JSON.stringify(data.data),
            success: function (res) {
                if (data.success) {
                    data.success(res);
                }
            },
            fail: function (res) {
                if (data.fail) {
                    data.fail(res);
                }
            }
        })
    },
    Tip: function (msg) {
        wx.showToast({
            icon: "none",
            title: msg
        })
    },

    uploadImages: function (picture, apiName, currentNum) {
        var that = this
        console.log(currentNum==picture.length-1?"true":"false")
        wx.uploadFile({
          url: apiName,
          filePath: picture[currentNum],
          name: "file",
          formData:{
              type:1,
              isLast:(currentNum==picture.length-1?"true":"false")
          },
          header:that.globalData.header,
          success: function (res) {
            currentNum++
            console.log(res)
          },
          fail: function (res) {
            currentNum++
            console.log(res)
          },
          complete: function () {
            console.log(picture)
            if (currentNum == picture.length) {
              console.log("上传完成")
              currentNum = 0
            } else {
              console.log(currentNum)
              that.uploadImages(picture, apiName, currentNum)
            }
          }
        })
      },

    // app全局数据
    globalData: {
        userInfo: null,
        header: {
            'cookie': ''
        },
        registered: false,
        messageBoxData: [],
        showPostId: "",
        websocket: {
            task: null,
            hasConnected: false
        },
        innerAudioContext: null
    }
});