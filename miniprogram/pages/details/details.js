// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proinfo: { //商品信息
      name: "舰队收藏 欧根亲王",
      desc: "价格实惠，人气超高",
      descimages: [
        "cloud://yhml.7968-yhml-1302923188/products/2815647_1.jpg", "cloud://yhml.7968-yhml-1302923188/products/2815647_2.jpg", "cloud://yhml.7968-yhml-1302923188/products/2815647_3.jpg", "cloud://yhml.7968-yhml-1302923188/products/2815647_4.jpg",
      ],
      factory: "良笑舍",
      image: "cloud://yhml.7968-yhml-1302923188/products/2815647_1.jpg",
      liked: 15,
      sold: 27,
      total: 100,
      specs: [{
        spec: "现货",
        price: 1400
      }, {
        spec: "预定(2019年2月出荷)",
        price: 200
      }],
      type: "比例人形"
    },
    comments: [{
        nickname: "伊红美蓝菌",
        time: "2019-09-09",
        avatar: "cloud://yhml.7968-yhml-1302923188/avatar/useravatardefault.jpg",
        text: "给孩子买的，孩子很喜欢，当天就和他表弟炫耀，然后就被我送给他表弟了。这么小就知道兄弟亲善，我很欣慰。"
      },
      {
        nickname: "王小明",
        time: "2019-09-15",
        avatar: "cloud://yhml.7968-yhml-1302923188/avatar/useravatar21055.jpg",
        text: "此时，一名不愿透露姓名的假面骑士路过"
      },
      {
        nickname: "开发者",
        time: "2019-09-20",
        avatar: "cloud://yhml.7968-yhml-1302923188/avatar/useravatar21058.jpg",
        text: "这只是为了说明这个组件可以容纳任意数目的评论（理想状态），事实上当然会限制咯。"
      }
    ],
    selectPanelShow: false, //是否显示商品规格选择面板
    currentImage: 1, // 轮播图的当前图片
    garallyShow: false, //是否显示画廊
    currentGallery: 0, //画廊显示的当前图片
    liked: true, //是否收藏
    specNow: 0, //当前选择的规格
    count: 1, //当前购买的数量
    orderList:[],  //订单表
  },

  // 打开选择规格面板
  showSelectPanel() {
    this.setData({
      selectPanelShow: true
    })
  },

  // 隐藏选择规格面板
  hideSelectPanel() {
    this.setData({
      selectPanelShow: false
    })
  },

  // 更改数量
  changeCount(e) {
    var count = this.data.count;
    if (e.currentTarget.dataset.act == "add") {
      count++;
    } 
    else if (e.currentTarget.dataset.act == "minus") {
      count == 1 || count--;
    }else{
      console.error("恭喜你发现了一个bug");
      return;
    }
    this.setData({
      count: count
    })
  },

  //更改规格
  changeSpec(e){
    this.setData({
      specNow:e.currentTarget.dataset.index
    })
  },

  toggleLike(){
    this.setData({
      liked:!this.data.liked
    })
  },

  addToCart(){
    var arr=[1]
    this.setData({
      orderList:arr
    })
    this.hideSelectPanel();
  },

  // 轮播图数字的显示
  showNum(e) {
    this.setData({
      currentImage: e.detail.current + 1
    })
  },

  // 画廊显示
  showGallery(e) {
    this.setData({
      currentGallery: e.currentTarget.dataset.index
    });
    wx.nextTick(() => {
      this.setData({
        garallyShow: true
      })
    })
  },

  dosth() {
    return 0;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.id) {
    //   this.getDetailsById(options.pid);
    // }
  },

  //根据id查找商品信息
  getDetailsById(pid) {
    pid = pid * 1; //传过来的参数时字符串，必须转化为数值才能进行查找
    var products = wx.cloud.database().collection("products");
    products.field({
      name: true,
      desc: true,
      descimages: true,
      factory: true,
      image: true,
      liked: true,
      sold: true,
      total: true,
      type: true
    }).where({
      pid: pid
    }).get({
      success: (res) => {
        console.log(res.data);
      }
    })
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