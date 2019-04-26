//index.js
//获取应用实例
let app = getApp();  
const api = require('../../api/index.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    functionalList:[{
      title:'资格查询'
      ,image:'zigechaxun.png'
      ,url:''
    }, {
        title: '二手跌幅榜'
        , image: 'ershoudiefu.png'
        , url: ''
      }, {
        title: '二手房估价'
        , image: 'ershougujia.png'
        , url: ''
      },{
        title: '全部楼盘'
        , image: 'quanbuloupan.png'
        , url: ''
      }, {
        title: '交易数据'
        , image: 'jiaoyidata.png'
        , url: ''
      }, {
        title: '刚需查询'
        , image: 'gangxu.png'
        , url: ''
      }, {
        title: '置业顾问'
        , image: 'zhiye.png'
        , url: ''
      }, {
        title: '房贷计算'
        , image: 'zigechaxun.png'
        , url: ''
      }, {
        title: '建行贷款'
        , image: 'jianhangdai.png'
        , url: ''
      }, {
        title: '热门公寓'
        , image: 'zigechaxun.png'
        , url: ''
      }],
      hotList:[{
        name:'1'},{name:'2'},{name:'3'}],
      typelist:[
        {type:'hot'},
        {type: 'willsold'}
      ],
      houseList:{
        hot:[],
        booking:[],
        latestOpen:[],
        latesdyao:[],
        lastyao:[],
        apartment:[]
      }
  },
  // 进入详情
  clickInto: function (e) {
    console.log(e)
      let hid = e.currentTarget.dataset.hid;
      let name = e.currentTarget.dataset.name;
      wx.navigateTo({
        url: '/pages/housedetail/housedetail?hid='+hid + '&name='+ name,
      })
  },
  getHouseList: function() {
    let houseList = this.data.houseList;
      wx.post(api.getHouseInfo, {})
      .then( res => {
        if( res.data.code == 0){
          let result = res.data.data;
           for( let i = 0; i < result.length; i++){
             switch(result[i].status){
                case 1: houseList.hot.push(result[i]);
                     break;
               case 2: houseList.booking.push(result[i]);
                 break;
               case 3: houseList.latestOpen.push(result[i]);
                 break;
               case 4: houseList.latesdyao.push(result[i]);
                 break;
               case 5: houseList.lastyao.push(result[i]);
                 break;
               case 6: houseList.apartment.push(result[i]);
                 break;
             }
           }
           this.setData({
             houseList: houseList
           })
        }
      }).catch( error => {
        // console.log(error)
      })
  },
  //进入搜索页面
  goSearch: function(){
      wx.navigateTo({
        url: '/pages/search/search',
      })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.eidtTabBar();
    if(!wx.getStorageSync('userinfo')){
        wx.reLaunch({
          url: '/pages/login/login',
        })
    } else{
      this.getHouseList();
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
