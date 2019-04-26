// pages/memberCenter/memberCenter.js
const App = getApp();
const api = require('../../api/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      wxUserInfo:{},
      isCompleted: false
  },
  gotoComplete: function () {
      wx.navigateTo({
        url: '/pages/compoleteInfo/completeInfo',
      })
  },
  isComplete: function () {
      wx.post(api.isCompleteApi, {})
      .then( res => {
        console.log(res)
        if(res.data.code == 0){
          if(res.data.data == 1){
            this.setData({
              isCompleted: true
            })
          } else if (res.data.data == 0){
            this.setData({
              isCompleted: false
            })
          }           
        }
      }).catch( error => {
        // console.log(error)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.eidtTabBar();

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
    this.isComplete();

    let wxUserInfo = wx.getStorageSync('userinfo');
    this.setData({
      wxUserInfo: wxUserInfo
    })
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