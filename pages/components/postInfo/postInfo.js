Component({
  properties: {
    postInfo: {
      type:Object,
      data:null
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    bindtapPreview:function(e){
      console.log(e);
      var that = this;
      var photoid = e.currentTarget.dataset.photoid;
      var pictureUrls = this.data.postInfo.picture.map(function (v) {
        return v.file_id
      });
      console.log("photoid:"+photoid);
      wx.previewImage({
        current:pictureUrls[photoid],
        urls:pictureUrls
      })
    }
  }
})