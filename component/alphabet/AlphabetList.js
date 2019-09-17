var app = getApp();
const api = require('../../config/config.js');
// component/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Object,
            value: null
        },
        requestNumber: {
            type: Number,
            value: null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        alpha: '',
        windowHeight: '',
        addBg: false,
        showList: [],
        messageNumber: 0,
        selectorShow:true
    },

    ready: function () {

        try {
            var res = wx.getSystemInfoSync();
            //每一个字母所占的高度
            this.apHeight = res.windowHeight / 27;
            this.setData({
                windowHeight: res.windowHeight
            })
        } catch (e) {

        }

    },
    //声明周期
    pageLifetimes: {
        show: function () {
            let that = this;
            var showFunc = () => {
                if (that.properties.list) {
                    that.setData({
                        showList: this.properties.list,
                    })
                    that.sortByFirstLetter("");
                }
                else {
                    setTimeout(showFunc, 100)
                }
            }
            that.setData({
                selectorShow:true
            })
            showFunc();
            this.onMessage();
            this.checkMessageNumber();
        },
        hide:function(){
            let that = this;
            that.setData({
                selectorShow:false
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //点击
        handlerAlphaTap(e) {
            let {
                ap
            } = e.target.dataset;
            this.setData({
                alpha: ap
            });
        },
        sortByFirstLetter: function (text) {
            let that = this;
            var newList = {}
            //生成字母排序的用户列表
            for (let i = 65; i < 91; i++) {
                newList[String.fromCharCode(i)] = []
            }
            newList['#'] = [];
            Object.keys(that.properties.list).forEach(function (index) {
                let item = that.properties.list[index]; //单个用户信息
                var str;
                Object.keys(item).forEach(function (index) {
                    if (item[index] && index != "avatar" && index != "email")
                        str += item[index]
                })
                console.log(str)
                if (str.search(text) != -1) {
                    let account = item.account; //用户账号
                    let firstLetter = account.charAt(0).toUpperCase(); //首字母
                    newList[firstLetter].push(item); //增加一个
                }
            })
            that.setData({
                showList: newList
            })
        },
        search: function (event) {
            let that = this;
            let text = event.detail.value;
            if (text == "")
                return;
            that.sortByFirstLetter(text);
        },
        onMessage: function () {
            let that = this;
            console.log("messageBoxjs打开消息监听")
            app.globalData.websocket.task.onMessage(function (res) {
                //强制JSON化
                let message = JSON.parse(res.data);
                that.checkMessageNumber();
                //消息加入缓存
            })
        },
        checkMessageNumber: function () {
            let that = this;
            var total = 0;
            var messageBoxData = app.globalData.messageBoxData;
            console.log("总盒子",messageBoxData)
            Object.keys(messageBoxData).forEach(function (index) {
                let item = messageBoxData[index]
                if (item) {
                    console.log("checkNumber 遍历", index,item)
                    let number = parseInt(item.number);
                    console.log(item.number,"\tparsed:",number,typeof(number))
                    total = parseInt(total) + parseInt(number);
                    console.log("temp Total\t",total)
                }
            })
            console.log("消息总数",total)
            that.setData({
                messageNumber:total
            })
        },
        //滑动
        handlerMove(e) {
            let {
                list
            } = this.data;
            let letter = Object.keys(list);
            this.setData({
                addBg: true
            });
            let rY = e.touches[0].clientY; //竖向滑动的距离
            if (rY >= 0) {
                let index = Math.ceil((rY - this.apHeight) / this.apHeight);
                console.log(index)
                //假设
                if (0 <= index && index <= 27) {
                    let item = list[letter[index]];
                    //如果索引字母为？的数组为空，则不设置当前字母
                    item && this.setData({
                        alpha: letter[index]
                    });
                }
            }
        },
        //滑动结束
        handlerEnd(e) {
            this.setData({
                addBg: false
            });
        },
        startChat: function (res) {
            let to = res.currentTarget.dataset.to;
            console.log(res)
            wx.navigateTo({
                url: '../chatFrame/chatFrame',
                events: {
                    to: function (data) {
                    }
                },
                success: function (res) {
                    res.eventChannel.emit("to", to)
                }
            })
        }
    },
})