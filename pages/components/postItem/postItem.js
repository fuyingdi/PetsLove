Component({
    properties: {
      postItemData:{
          type:Object,
          data:{}
      }
      
    },
    data: {
      like:true,
      collect:true
      // 这里是一些组件内部数据
    },
    methods: {
      // 这里是一个自定义方法
      isLike:function(){
        this.setData({
          like:!this.data.like
        })
      },

      isCollect:function(){
        this.setData({
          collect:!this.data.collect
        })
      },

      bindtapShowPhoto:function(e){
        var photoId = e.currentTarget.dataset.photoid  //获取选中组件的图片id
        var myPhotosPath = this.data.postItemData.picture;               //不能是本地地址 要求url
        wx.previewImage({
          current: myPhotosPath[photoId],     //当前图片地址
          urls: myPhotosPath,               //所有要预览的图片的地址集合 数组形式 
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
    }
  }
})