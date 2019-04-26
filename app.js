//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  eidtTabBar() {
    let _curretPagaArr = getCurrentPages();
    let _currentPage = _curretPagaArr[_curretPagaArr.length - 1];
    let current_route = _curretPagaArr[0].__route__;
    if (current_route.indexOf('/') != 0) {
      current_route = '/' + current_route;
    }
    let tabBar = this.globalData.tabBar;
    for (let i = 0; i < tabBar.list.length; i++) {
      if (tabBar.list[i].pagePath === current_route) {
        for (let j = 0; j < tabBar.list.length; j++) {
          tabBar.list[j].active = false;
        }
        tabBar.list[i].active = true;
      }
    }
    _currentPage.setData({
      tabBar: tabBar
    })
  },
  globalData: {
    userInfo: null,
    tabBar: {
      "list": [{
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/shouye.png",
        "selectedIconPath": "/images/shouye_selected.png",
        active: true
      },
      // {
      //   "pagePath": "/pages/quan/quan",
      //   "text": "房友圈",
      //   "iconPath": "/images/quan.png",
      //   "selectedIconPath": "/images/quan_selected.png",
      //   active: false
      // },
      {
        "pagePath": "/pages/memberCenter/memberCenter",
        "text": "我的",
        "iconPath": "/images/user.png",
        "selectedIconPath": "/images/user_selected.png",
        active: false
      }
      ]
    }
  }
})