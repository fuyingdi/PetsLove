Page({
  data: {
    petSticket:[
      {
        "trade_id":"12",
        "pet_name":"当当",
        "picture":"./image/cat1.jpeg",
        "bleed":"猫",
        "prospective_price":"300"
      },
      {
        "trade_id":"12",
        "pet_name":"当当",
        "picture":"./image/test.jpeg",
        "bleed":"quin",
        "prospective_price":"999"
      },
      {
        "trade_id":"12",
        "pet_name":"当当",
        "picture":"./image/chai.jpeg",
        "bleed":"柴犬",
        "prospective_price":"999"
      },
      {
        "trade_id":"12",
        "pet_name":"当当",
        "picture":"./image/chai2.jpeg",
        "bleed":"柴犬",
        "prospective_price":"998"
      },
      {
        "trade_id":"12",
        "pet_name":"当当",
        "picture":"./image/suzume.jpeg",
        "bleed":"suzume",
        "prospective_price":"100"
      }
    ],
    page:1,
  },
  //加载交易帖
  onLoad:function(e){
    var that = this;
    var now = new Date().getTime();
    var nextPage = this.data.page + 1;
    app.petloveRequest({
      url:app.getTradeInfoList,
      method:"POST",
      data:{
        page:1,
        query_time:now,
      },
      success(res){
        that.setData({
          petSticket:res.data,
          page:nextPage,
        })
      },
      fail(res){
        console.log("market页面首次加载失败");
      }
    })
  },

  openDetail:function(event){
    wx.navigateTo({
      url:"../showTrade/showTrade?trade_id="+ event.currentTarget.id,
    })
  },

  onReachBottom:function(){
    var that = this;
    var now = new Date().getTime();
    var nextPage = this.data.page + 1;
    app.petloveRequest({
      url:app.getTradeInfoList,
      method:"POST",
      data:{
        page:that.data.page,
        query_time:now,
      },
      success(res){
        var allPage = that.data.petSticket;
        allPage = allPage.concat(res.data);
        that.setData({
          petSticket:allPage,
          page:nextPage,
        })
      },
      fail(res){
        console.log("market页面触底加载失败");
      }
    })
  }
})