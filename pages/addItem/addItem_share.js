const api = require('../../config/config.js');
var app = getApp();

Page({
  data: {
    textAreaCount: 0,
    notShowTopTips: true,
    errorMsg: "标题和正文必须填写",
    postData: {
      title: "",
      content: "",
      picture: []
    },


  },




  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          'postData.picture': that.data.postData.picture.concat(res.tempFilePaths)
        });
      }
    })
  },

  titleInput: function (e) {
    var title = e.detail.value
    this.setData({
      'postData.title': title
    })

  },

  textAreaInput: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    this.setData({
      textAreaCount: len,
    })

    this.setData({
      'postData.content': value
    })
    console.log(this.data.postData.content)
  },

  cancel: function (e) {
    console.log(e)
    console.log(this.data.postData.picture)
    var photoId = e.currentTarget.dataset.photoid
    this.data.postData.picture.splice(photoId, 1)
    this.setData({
      'postData.picture': this.data.postData.picture
    })
    console.log(this.data.postData.picture)
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
      header:app.globalData.header,
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

  sendPost: function () {
    var that = this;
    var postData = this.data.postData


    if (postData.title == "" || postData.content == "") {
      this.setData({
        notShowTopTips: false
      });
      setTimeout(function () {
        that.setData({
          notShowTopTips: true
        });
      }, 2000);
    }

    console.log(postData)
    app.petloveRequest({
      url: api.addPost,
      data: {
        title: postData.title,
        content: postData.content,
        type:"1"
      },
      header:app.globalData.header,
      method:'POST',
      success: function (res) {
        console.log("done?")
        if (postData.picture.length!=0) {
          that.uploadImages(postData.picture,api.uploadPostFile,0)
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


    console.log(postData.picture)




  }




});