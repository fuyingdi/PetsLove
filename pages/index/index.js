// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postdata:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    count:18
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var array = this.data.postdata;
    for(var i=0;i<3;i++){
      array.push(i+this.data.count);
    }
    this.setData({
      postdata:array
    })
    this.data.count=this.data.count+3;
  },

})