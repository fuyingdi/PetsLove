Page({
  data: {
    myPhotos:[
      {
        "id":"0",
        "photoAddress":"./image/cat1.jpeg",
        "notChoosed":true
      },
      {
        "id":"1",
        "photoAddress":"./image/test.jpeg",
        "notChoosed":true
      },
      {
        "id":"2",
        "photoAddress":"./image/chai.jpeg",
        "notChoosed":true
      },
      {
        "id":"3",
        "photoAddress":"./image/chai2.jpeg",
        "notChoosed":true
      },
      {
        "id":"4",
        "photoAddress":"./image/suzume.jpeg",
        "notChoosed":true
      }
    ],
    test:[
      "https://c-ssl.duitang.com/uploads/item/201407/24/20140724205549_UMiaH.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510647520&di=101e876fdc76b9645a9f1abb69bb18e4&imgtype=0&src=http%3A%2F%2F09.imgmini.eastday.com%2Fmobile%2F20180511%2F20180511110022_2780320ae825163e89066d2e841b9cb8_1.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510690673&di=9e70750cd5a9a9c573d7ec112fa70f73&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F22%2F20161022215835_sUSLP.thumb.700_0.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510719053&di=ef0969c7b0c67ef5a2817220d3b9e1db&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170413%2F4826bd2aac094ff88e9ffe5cbfca21ef_th.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567510742766&di=cb4bf0fe988be0a08e84515841f8097a&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fb5d978006017e09df92a41007fa55ba56c674729.jpg"
    ],

    imagesChoosed:[],

    chosenBuffer:[],

    editMode:false
  },
  
 


  chosenImage:function(e){
    var photoId = e.currentTarget.dataset.photoid;  //获取选中组件的图片id


    if(!this.data.editMode){                           //预览模式下打开图片预览
      var myPhotosPath = this.data.test;               //不能是本地地址 要求url
      wx.previewImage({
        current: myPhotosPath[photoId],     //当前图片地址
        urls: myPhotosPath,               //所有要预览的图片的地址集合 数组形式 
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      });


    }else{                                //编辑模式下放进待删数组
      var notChoosed = this.data.myPhotos[photoId].notChoosed;

      //setData方法只能这样修改页面数据中对象数组中某一对象属性值
      //只有使用setData方法才能将逻辑层的数据更改动态渲染到视图层
      var operator = "myPhotos["+photoId+"].notChoosed";  

      //选中图片或撤销选中
      this.setData({[operator]:!notChoosed});

      //判断buffer中是否有重复选取的图片，若有则删除，无则添加
      var cancelFlag=false;
      for(var i=0;i<this.data.chosenBuffer.length;i++){
        if(this.data.chosenBuffer[i].id==this.data.myPhotos[photoId].id){

          this.data.chosenBuffer.splice(i,1);
          cancelFlag=true;
          break;
        }
      }
      if(!cancelFlag)
        this.data.chosenBuffer.push(this.data.myPhotos[photoId]);

      //将buffer中的图片对象通过setData方法赋值给imagesChoosed
      this.setData({imagesChoosed:this.data.chosenBuffer});
    }
  },

  editModeOn:function(e){
    this.setData({editMode:true});
  },

  editModeOff:function(e){
    this.setData({editMode:false});
    
    var length = this.data.myPhotos.length;

    //退出编辑模式，将imagesChoosed和buffer表清空
    //并将所有被选取图片置于未选取状态
    for(var i=0;i<length;i++){
      var operator = "myPhotos["+i+"].notChoosed";
      this.setData({[operator]:true});
      this.data.chosenBuffer=[];
      this.setData({imagesChoosed:[]});
    }

  },

  uploadImage:function(){
    if(!this.data.editMode){
      wx.chooseImage();
    }
  }

})