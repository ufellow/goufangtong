// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      inputValue: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //进入搜索页面
    goSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
    //获取输入内容
    searchInput(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    // 清除内容
    handleClear(res) {
      this.setData({
        inputValue: ''
      })
    },
  }
})
