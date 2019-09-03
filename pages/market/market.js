Page({
  data: {
    petStricket:[
      {
        "photoAddress":"./image/cat1.jpeg",
        "introducer":"猫",
        "money":"300"
      },
      {
        "photoAddress":"./image/test.jpeg",
        "introducer":"quin",
        "money":"999"
      },
      {
        "photoAddress":"./image/chai.jpeg",
        "introducer":"柴犬",
        "money":"999"
      },
      {
        "photoAddress":"./image/chai2.jpeg",
        "introducer":"柴犬",
        "money":"998"
      },
      {
        "photoAddress":"./image/suzume.jpeg",
        "introducer":"suzume",
        "money":"100"
      }
    ]
  },



  openDetail:function(event){
    var postId = event.currentTarget.id;
    console.log(postId);
    console.log(event);
  }
})