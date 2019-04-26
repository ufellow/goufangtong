// pages/more/more.js
const App = getApp();
const api = require('../../api/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    houseList:[]
  },
  // 进入详情
  clickInto: function (e) {
    // console.log(e)
    let hid = e.currentTarget.dataset.hid;
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '/pages/housedetail/housedetail?hid=' + hid + '&name=' + name,
    })
  },
  // 获取house信息
  getHouseInfo: function (status) {
    const _this = this;
    wx.get(api.searchByStatus,{
      arr:status,
      search:''
    }).then( res => {
      console.log(res)
      if( res.data.code == 0) {
          _this.setData({
            houseList: res.data.data
          })
      }
    }).catch( error => {
      console.log(error)
    })
  },
  // 获取条件筛选组件传递回来的结果
  getConditionResult: function (e) {
    console.log(e)
    let houseList = e.detail
    this.setData({
      houseList: houseList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHouseInfo(options.status);    
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