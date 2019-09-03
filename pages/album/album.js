Page({
  data: {
    myPhotosPath:[
      "./image/upload.png",
      "./image/cat1.jpeg",
      "./image/test.jpeg",
      "./image/chai.jpeg",
      "./image/chai2.jpeg",
      "./image/suzume.jpeg"
    ],
    test:[
      "https://c-ssl.duitang.com/uploads/item/201407/24/20140724205549_UMiaH.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510690673&di=9e70750cd5a9a9c573d7ec112fa70f73&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F22%2F20161022215835_sUSLP.thumb.700_0.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510719053&di=ef0969c7b0c67ef5a2817220d3b9e1db&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170413%2F4826bd2aac094ff88e9ffe5cbfca21ef_th.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510742766&di=cb4bf0fe988be0a08e84515841f8097a&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fb5d978006017e09df92a41007fa55ba56c674729.jpg"
    ]
  },
  


  openPreview:function(e){
    var photoId = e.currentTarget.dataset.photoid;
    var myPhotosPath = this.data.test;
    console.log(e);
    
    if(photoId==0){
      console.log("upload todo");
      wx.chooseImage();
    }else{
      photoId=photoId-1;
      wx.previewImage({
        current: myPhotosPath[photoId],     //当前图片地址
        urls: myPhotosPath,               //所有要预览的图片的地址集合 数组形式
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      });
  }
  }
})