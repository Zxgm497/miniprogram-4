//index.js
const app = getApp()

Page({
  data: {
    prolists:[],
    timer1:null,
    timer2:null,
    showLoading:true
  },

  //通过类型获取分类
  getProlistByType(type,timer){
    var products=wx.cloud.database().collection("products");
    products.field({
      pid:true,
      abbr:true,
      image:true,
      desc:true,
      specs:true,
      name:true
    }).where({
      type:type
    }).limit(8).get({
      success:(res)=>{
        if(timer){
          clearTimeout(timer);
        }
        if(type=="可动手办"){
          this.setData({
            showLoading:false
          })
        }
        res.data.forEach((item,index)=>{
          res.data[index].image='cloud://yhml.7968-yhml-1302923188/products/'+item.image;
          res.data[index].complete=false;
        })
        var prolists=this.data.prolists;
        prolists.push(res.data);
        this.setData({
          prolists:prolists
        })
        console.log(this.data.prolists);
      }
    })
  },

  //页面滚动触发商品加载
  onPageScroll:function(e){
    if(e.scrollTop>600&&this.data.prolists.length==1){
      if(!this.data.timer1){
        this.setData({
          timer1:setTimeout(()=>{
            this.getProlistByType("比例人形",this.timer1);
          })
        })
      }
    }
    if(e.scrollTop>1600&&this.data.prolists.length==2){
      if(!this.data.timer2){
        this.setData({
          timer2:setTimeout(()=>{
            this.getProlistByType("可动手办",this.timer2);
          })
        })
      }
    }
  },

  // 监听图片加载
  isCompleted(e){
    var completed=`prolist[${e.currentTarget.dataset.index}].complete`;
    this.setData({
      [completed]:true
    })
  },

  //跳转至详情页
  toDetail(e){
    wx.navigateTo({
      url: '/pages/details/details?pid='+e.currentTarget.dataset.pid,
    })
  },

  onLoad: function() {

    this.getProlistByType("黏土人");

    if (!wx.cloud) {
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
