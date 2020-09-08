// pages/searchList/searchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
  },

  // 在搜索框输入时执行的函数
  search: function (value) {
    if (!value) {
      return new Promise((resolve, reject) => {
        resolve([]);
      })
      this.selectComponent("#searchBar").clearInput();
      this.selectComponent("#searchBar").hideInput();
    } else {
      var hotwords = wx.cloud.database().collection('hotwords');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          hotwords.field({
              words: true
            }).where({
              words: { //columnName表示欲模糊查询数据所在列的名
                $regex: '.*' + value + '.*', //queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
                $options: '1' //$options:'1' 代表这个like的条件不区分大小写,详见开发文档
              }
            }).orderBy('hot', 'desc').limit(8)
            .get({
              success: (res) => {
                var results = [];
                res.data.forEach((item, index) => {
                  var obj = {}
                  obj.text = item.words;
                  obj.value = item.words;
                  results.push(obj);
                })
                resolve(results);
              }
            })
        }, 200)
      })
    }
  },

  searchProducts({condition={},orderby='sold',order='desc',skip=0,limit=100}){
    var collection=wx.cloud.database().collection('products');
    collection.field({
      name:true,
      image:true,
      factory:true,
      specs:true,
      pid:true,
      sold:true,
      desc:true
    }).where(condition).orderBy(orderby,order).skip(skip).limit(limit).get({
      success:(res)=>{
        res.data.forEach((item,index)=>{
          res.data[index].price=item.specs[0].price;
          res.data[index].image='cloud://yhml.7968-yhml-1302923188/products/'+item.image;
        })
        console.log(res.data);
        this.setData({
          result:res.data
        })
      },
      fail:()=>{
        console.log('notfound');
      }
    })
  },

  // 选择搜索出来的结果
  selectResult: function (e) {
    var value=e.detail.item.value;
    this.searchProducts({
      condition:{
        keywords: { 
          $regex: '.*' + value + '.*',
          $options: '1'
        }
      }
    });
    // 清空搜索框内容并隐藏option
    this.selectComponent("#searchBar").clearInput();
    this.selectComponent("#searchBar").hideInput();
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