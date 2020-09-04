// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [{
        name: "舰队收藏 欧根亲王",
        image: "cloud://yhml.7968-yhml-1302923188/products/2815647_1.jpg",
        spec: "预定（2019年2月出荷）",
        price: 200,
        count: 1,
        ischecked: true
      },
      {
        name: "舰队收藏 欧根亲王",
        image: "cloud://yhml.7968-yhml-1302923188/products/2815647_1.jpg",
        spec: "现货",
        price: 1400,
        count: 1,
        ischecked: true
      },
      {
        name: "舰队收藏 欧根亲王",
        image: "cloud://yhml.7968-yhml-1302923188/products/2815647_1.jpg",
        spec: "现货",
        price: 1400,
        count: 1,
        ischecked: true
      }
    ],
    totalPrice: 1600, //总价
    totalSelected: true //全选控制
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '购物车'
    });
    // 计算总价
    var totalPrice = this.data.orderlist.reduce((total, item) => {
      return total + item.price * item.count * item.ischecked;
    }, 0);
    this.setData({
      totalPrice
    });
  },

  // 加减
  changeCount(event) {
    var index = event.currentTarget.dataset.index;
    if (event.currentTarget.dataset.act == "add") {
      var count = `orderlist[${index}].count`;
      this.setData({
        [count]: this.data.orderlist[index].count + 1
      })
    } else if (event.currentTarget.dataset.act == "minus") {
      var count = `orderlist[${index}].count`;
      this.setData({
        [count]: this.data.orderlist[index].count <= 1 ? 1 : this.data.orderlist[index].count - 1
      })
    }else{
      console.log("恭喜你发现了一个bug");
    }
    this.updateTotalPrice();
  },

  //单选
  toggleSelected(event){
    var index=event.currentTarget.dataset.index;
    var mychecked=`orderlist[${index}].ischecked`;
    this.setData({
      [mychecked]:!this.data.orderlist[index].ischecked
    })
    this.updateSelectAll();
    this.updateTotalPrice();
  },

  // 全选按钮
  selectAll(){
    var orderlist=this.data.orderlist;
    orderlist.forEach((item)=>{
      item.ischecked=!this.data.totalSelected;
    })
    this.setData({totalSelected:!this.data.totalSelected,orderlist});
    this.updateTotalPrice();
  },

  // 此函数负责更新总价
  updateTotalPrice() {
    var totalPrice = this.data.orderlist.reduce((total, item) => {
      return total + item.price * item.count * item.ischecked;
    }, 0);
    this.setData({
      totalPrice
    });
  },

  // 此函数控制全选按钮的选定
  updateSelectAll(){
    var totalSelected=this.data.orderlist.every((item)=>{
      return item.ischecked;
    })
    this.setData({totalSelected});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})