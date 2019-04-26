// pages/housedetail/housedetail.js
const App = getApp();
const api = require("../../api/index.js")
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
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    current: 0,
    houseInfo:{},
    hid:null,
    name: null
  },
  handleChange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 获取房信息
  getHouseDetail: function( hid ) {
    const _this = this;
    wx.get(api.getHouseDetailApi, {
      // hid: hid
    }).then( res => {
      if(res.data.code == 0){
       _this.setData({
         houseInfo: res.data.data
       })
      }
      console.log(_this.data.houseInfo)

    }).catch( error=> {
      // console.log(error)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getHistoryYao: function (hid) {
    wx.post(api.getHistoryYao,{
      hid:hid
    }).then( res=> {

    }).catch( error => {
      // console.log(error)
    })
  },
  onLoad: function (options) {
    this.getHouseDetail(options.hid);
    this.setData({
      name: options.name
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