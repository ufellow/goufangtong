// pages/search/search.js
const App = getApp();
const api = require("../../api/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    selectList:[
      '全部',
      '热门楼盘',
      '即将预售',
      '最新开盘',
      '最新摇号',
      '摇号剩余',
      '热门公寓'],
      selectedId:0,
      isShow: false,
      historyList:[],
      searchResult:[]
  },
  handleClick: function () {
    let isShow = this.data.isShow;
      this.setData({
        isShow: !isShow
      })
  },

  // 选择搜索类型
  // status | int 1热门2即将预售3最新开盘4最新摇号5摇号剩余6热门公寓
  handleSelect: function (e) {
    let selectedId = e.currentTarget.dataset.selectedid;
    this.setData({
      selectedId:selectedId,
      isShow: false
    })
  },
  search: function () {
    const _this = this;
      wx.get( api.searchByStatus,{
        arr: _this.data.selectedId,
        search: _this.data.inputValue
      }).then( res => {
        console.log(res)
        if( res.data.code == 0){
            if(res.data.data.length !=0){
              this.setData({
                searchResult: res.data.data
              })
            } else{
              wx.showToast({
                title: '暂无数据',
                icon:'none'
              })
            }
          this.getHistorySearch();

        }
      }).catch( error => {
        // console.log(error)
      })
  },
  clickHistorySearch: function (e){
      let search = e.currentTarget.dataset.search;
    wx.get(api.searchByStatus, {
      search: search,
      arr:''
    })
        .then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.setData({
              searchResult: res.data.data
            })
          }
        }).catch(error => {
          // console.log(error)
        })
  },
  //获取输入内容
  searchInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 清除内容
  handleClear: function(res) {
    this.setData({
      inputValue: ''
    })
  },
  // 获取搜索历史
  getHistorySearch(){
    wx.post(api.getHistorySearch,{}).then( res => {
      // console.log(res)
     if( res.data.code == 0){
       this.setData({
         historyList: res.data.data
      })
     }
    }).catch( error => {
      // console.log(error)
    })
  },
  clearHistory: function() {
    wx.post(api.clearHistorySearch,{}).then( res => {
      console.log(res)
      if(res.data.code == 0){
        this.setData({
          historyList:[]
        })
      }
    }).then( error => {
      // console.log(error)
    })
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
    this.getHistorySearch();
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