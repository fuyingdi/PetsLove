Page({
  data: {
    animation:""
  },
  onShow:function(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'liner',
      delay: 0
    });
    var next=true;
    setInterval(function () {
      if (next) {
        animation.scale(0.9).step()
        next = !next;
      } else {
        animation.scale(1).step()
        next = !next;
      }
      this.setData({
        animation: animation.export()
      })
    }.bind(this), 500)
  },
  uploadTrade:function(){
    wx.navigateTo({
      url: '/pages/addItem/addItem_sell',
    })
  },
  uploadShare:function(){
    wx.navigateTo({
      url: '/pages/addItem/addItem_share',
    })
  }
})