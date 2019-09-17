const api = require('../../config/config.js');
var app = getApp();


Page({
  data: {
    myPhotos: [
    {
      "src": "https://c-ssl.duitang.com/uploads/item/201407/24/20140724205549_UMiaH.jpeg",
    },
    {
      "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
    },
    {
      "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510690673&di=9e70750cd5a9a9c573d7ec112fa70f73&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F22%2F20161022215835_sUSLP.thumb.700_0.jpeg",
    },
    {
      "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510719053&di=ef0969c7b0c67ef5a2817220d3b9e1db&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170413%2F4826bd2aac094ff88e9ffe5cbfca21ef_th.jpg",
    },
    {
      "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510742766&di=cb4bf0fe988be0a08e84515841f8097a&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fb5d978006017e09df92a41007fa55ba56c674729.jpg",
    }
  ],

    imagesChoosed: [],

    editMode: false,

    page:1
  },


  onLoad:function(){
    var that = this
    var myAccount = app.globalData.userInfo.account
    app.petloveRequest({
      url:api.getAlbum,
      data:{
        account:myAccount,
        page:1
      },
      header:app.globalData.header,
      method:"POST",
      success:function(res){
        console.log(res)
        that.setData({
          myPhotos:res.data
        })
        that.data.page=that.data.page+1
        
      }
    })
  },

  onReachBottom:function(){
    var that = this
    var myPhotos=this.data.myPhotos
    var myAccount = app.globalData.userInfo.account
    app.petloveRequest({
      url:api.getAlbum,
      data:{
        page:that.data.page,
        account:myAccount
      },
      header:app.globalData.header,
      method:"POST",
      success:function(res){
        myPhotos = myPhotos.concat(res.data)
        that.setData({
          myPhotos:myPhotos
        })
        that.data.page=that.data.page+1
      }
    })
  },


  chosenImage: function (e) {
    var photoId = e.currentTarget.dataset.photoid; //获取选中组件的图片id


    if (!this.data.editMode) { //预览模式下打开图片预览
      var myPhotosPaths = this.data.myPhotos.map(function (v) {
        return v.src
      })
      wx.previewImage({
        current: this.data.myPhotos[photoId].src, //当前图片地址
        urls: myPhotosPaths, //所有要预览的图片的地址集合 数组形式 
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      });


    } else { //编辑模式下放进待删数组
      var notChoosed = this.data.myPhotos[photoId].notChoosed;
      console.log(e)

      //setData方法只能这样修改页面数据中对象数组中某一对象属性值
      //只有使用setData方法才能将逻辑层的数据更改动态渲染到视图层
      var operator = "myPhotos[" + photoId + "].notChoosed";

      //选中图片或撤销选中
      this.setData({
        [operator]: notChoosed==null?false:!notChoosed
      });

      //判断buffer中是否有重复选取的图片，若有则删除，无则添加
      var cancelFlag = false;
      for (var i = 0; i < this.data.imagesChoosed.length; i++) {
        if (this.data.imagesChoosed[i].src == this.data.myPhotos[photoId].src) {

          this.data.imagesChoosed.splice(i, 1);
          cancelFlag = true;
          break;
        }
      }
      if (!cancelFlag)
        this.data.imagesChoosed.push(this.data.myPhotos[photoId]);

      //将buffer中的图片对象通过setData方法赋值给imagesChoosed
      this.setData({
        imagesChoosed: this.data.imagesChoosed
      });
    }
  },

  editModeOn: function (e) {
    this.setData({
      editMode: true
    });
  },

  editModeOff: function (e) {
    this.setData({
      editMode: false
    });

    var length = this.data.myPhotos.length;

    //退出编辑模式，将imagesChoosed和buffer表清空
    //并将所有被选取图片置于未选取状态
    for (var i = 0; i < length; i++) {
      var operator = "myPhotos[" + i + "].notChoosed";
      this.setData({
        [operator]: true
      });
      this.setData({
        imagesChoosed: []
      });
    }

  },

  uploadImage: function () {
    var that = this
    if (!this.data.editMode) {
      wx.chooseImage({
        success: function (res) {
          console.log(res.tempFilePaths)
          var tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          that.uploadImages(tempFilePaths, 0)
        },
        fail: function () {
          console.log("what happen")
        },
      })
    }
  },

  uploadImages: function (picture, currentNum) {
    var that = this
    console.log(currentNum == picture.length - 1 ? "true" : "false")
    wx.uploadFile({
      url: api.uploadAlbumPicture,
      filePath: picture[currentNum],
      name: "file",
      formData: {
        type: 1,
        isLast: (currentNum == picture.length - 1 ? "true" : "false")
      },
      header: app.globalData.header,
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
          that.uploadImages(picture, currentNum)
        }
      }
    })
  },

  deleteImages: function () {
    var that = this
    console.log(this.data.imagesChoosed)
    var myPhotosId = this.data.imagesChoosed.map(function (v) {
      return v.file_id
    })
    var sendMsg = "("
    for (var i = 0; i < myPhotosId.length; i++) {
      if (i < myPhotosId.length - 1)
        sendMsg = sendMsg + "'" + myPhotosId[i] + "',"
      else
        sendMsg = sendMsg + "'" + myPhotosId[i] + "')"
    }
    console.log(sendMsg)
    // app.petloveRequest({
    //   url:api.deleteAlbumImages,
    //   data:{
    //     file_ids:sendMsg
    //   },
    //   success:function(){
    //     wx.reDirectTo({
    //       url:"pages/album/album"
    //     })
    //   }
    // })
  },

  svaeImageToSystemAlbum: function () {
    for (var i = 0; i < this.data.imagesChoosed.length; i++) {
      wx.getImageInfo({
        src: this.data.imagesChoosed[i].src,
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.path
          })
        }
      })
    }
  },


})