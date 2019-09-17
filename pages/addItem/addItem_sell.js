const api = require('../../config/config.js');
var app = getApp();


Page({
  data: {
    textAreaCount: 0,
    showTopTips: false,
    multiIndex: [0, 0, 0],
    multiArray: [['狗', '猫'], ['哈士奇', '金毛', '松狮', '萨摩耶', '边牧']],
    petInfo:{
      bleed:"",
      pet_name:"",
      content:"",
      prospective_price:"",
      picture:[],
      kind:""
    },
    errMsg:""
  },
  showTopTips: function (errMsg) {
    var that = this;

    this.setData({
      showTopTips: true,
      errMsg:errMsg
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
 
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'petInfo.picture': that.data.petInfo.picture.concat(res.tempFilePaths)
        });
      }
    })
  },


  textAreaInput:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length);
    this.setData({  
      textAreaCount:len,
    })

    this.setData({
      'petInfo.content':value
    })
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
    this.setData({
      'petInfo.kind':this.data.multiArray[0][this.data.multiIndex[0]],
      'petInfo.bleed':this.data.multiArray[1][this.data.multiIndex[1]]
    })
    console.log(this.data.petInfo.bleed)
  },

  cancel:function(e){
    var photoId=e.currentTarget.dataset.photoid
    this.data.petInfo.picture.splice(photoId,1)
    this.setData({
      'petInfo.picture':this.data.petInfo.picture
    })
    console.log(this.data.petInfo.picture)
  },
  
  inputPetName:function(e){
    var petName = e.detail.value
    this.setData({
      'petInfo.pet_name':petName
    })
  },

  inputPrice:function(e){
    var price = +e.detail.value
    this.setData({
      'petInfo.prospective_price':price
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
          type:2,
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

  sendTradeInfo:function(){
    console.log(this.data.petInfo)
    var that = this
    var petInfo = this.data.petInfo
    console.log(petInfo)
    if(petInfo.bleed==""||petInfo.pet_name==""||petInfo.prospective_price=="")
      this.showTopTips("转让宠物信息不能漏填")
    else if(/^[0-9]+$/.test(petInfo.prospective_price)==false)
      this.showTopTips("转让价格应是数字")
    else if(petInfo.picture.length<1)
      this.showTopTips("应至少上传一张宠物图片")
    else{

      app.petloveRequest({
        url: api.addPost,
        data: {
          pet_name:petInfo.pet_name,
          content:petInfo.content,
          bleed:petInfo.bleed,
          prospective_price:petInfo.prospective_price,
          kind:petInfo.kind,
          type:2
        },
        method:'POST',
        success: function (res) {
          console.log("done?")
          if (postData.picture.length!=0) {
            that.uploadImages(petInfo.picture,api.uploadPostFile,0)
          }
        },
        fail:function(res){
          console.log(res)
        },
        complete:function(){
          wx.showToast({
            icon:"success",
            title:"上传成功",
            duraction:2000
          })
        }
      })
    }
  }

});

