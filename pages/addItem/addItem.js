Page({
  data: {
    animation:""
  },
  onShow:function(){
    var left = wx.createAnimation({
      duration: 1000,
      timingFunction: 'liner',
      delay: 0
    });
    left.rotate(180*2).step();
    this.setData({
      left:left.export()
    })
    var right = wx.createAnimation({
      duration: 1000,
      timingFunction: 'liner',
      delay: 0
    });
    right.rotate(-180*2).step();
    this.setData({
      right:right.export()
    })
  }
})