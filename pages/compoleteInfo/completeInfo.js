// pages/compoleteInfo/completeInfo.js
const App = getApp();
const api = require("../../api/index.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:null,
      idcard:null,
      phone: null
  },
    // 获取输入框信息
    getInputValue: function(e) {
      // console.log(e)
      let inputValue = e.detail.value;
      let title = e.currentTarget.dataset.title;
      this.setData({
        [title]: inputValue
      })
    },
    comfirm(){
      let name= this.data.name;
      let idcard = this.data.idcard;
      let phone = this.data.phone;
      if(name == '' || name == null){
        wx.showToast({
          title: '请输入姓名',
          icon: 'none',
          duration: 2000
        })
      } else if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idcard))){
        wx.showToast({
          title: '请输入正确的身份证号码',
          icon: 'none',
          duration: 2000
        })
      } else if(!(/^1[34578]\d{9}$/.test(phone))){
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000
        })
      } else{
        wx.get(api.completeUserinfo,{
          name: name,
          idnumber:idcard,
          phone: phone
        }).then( res => {
          console.log(res)
         if(res.data.code == 0){
            wx.redirectTo({
              url: '/pages/memberCenter/memberCenter',
            })
          }
        }).catch( error => {
          // console.log(error)
        })
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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