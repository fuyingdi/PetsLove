Page({
  data: {
    files: [],
    textAreaCount: 0,
    showTopTips: false,
    multiIndex: [0, 0, 0],
    multiArray: [['狗', '猫'], ['哈士奇', '金毛', '松狮', '萨摩耶', '边牧']],
    radioItems: [],
    dogs: [
      { name: '哈士奇', value: '0' },
      { name: '金毛', value: '1' },
      { name: '松狮', value: '2' },
      { name: '柴犬', value: '3' },
      { name: '萨摩耶', value: '4' },
      { name: '边牧', value: '5' },
    ],
    cats:[
      { name: "暹罗", value: '0' },
      { name: "英短", value: '1' },
      { name: "布偶", value: '2' },
      { name: "苏格兰折耳猫", value: '3' },
      { name: "伯曼猫", value: '4' },
      { name:"波斯猫",value:'5'},
    ],
    checkboxItems: [
      { name: '哈士奇', value: '0', checked: true },
      { name: '金毛', value: '1' },
      { name: '松狮', value: '2' },
      { name: '柴犬', value: '3' },
      { name: '萨摩耶', value: '4' },
      { name: '边牧', value: '5' },
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  textAreaInput: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    this.setData({
      textAreaCount: len,
    })
  },
  open: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['猫', '狗'],
      success: function (res) {
        if (!res.cancel) {
          if(res.tapIndex==0)
          {
            that.setData({radioItems:that.data.cats})
          }
          else if(res.tapIndex==1)
            that.setData({ radioItems: that.data.dogs })
          console.log(res.tapIndex)
        }
      }
    });
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['哈士奇', '金毛', '松狮', '萨摩耶', '边牧'];
            break;
          case 1:
            data.multiArray[1] = ["暹罗", '英短', '布偶','波斯猫'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
});