// components/conditions/components.js
const App = getApp();
const api = require('../../api/index.js')
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
      tabList:['区域','户型','面积'],
      currentIndex: null,
      houseType: [{
          name: '一室',
          typeIndex:0,
          isActive:false
         }, {
          name: '二室',
          typeIndex: 1,
          isActive: false
        }, {
          name: '三室',
          typeIndex: 2,
          isActive: false
        }, {
          name: '四室',
          typeIndex: 3,
          isActive: false
        }, {
          name: '五室',
          typeIndex: 4,
          isActive: false
        }, {
          name: '五室以上',
          typeIndex: 5,
          isActive: false
        }],
    houseArea: [{
      name: '50m²以下',
      areaIndex: 0,
      isActive: false
    }, {
        name: '50-70m²',
        areaIndex: 1,
        isActive: false
    }, {
        name: '70-90m²',
        areaIndex: 2,
        isActive: false
    }, {
        name: '90-110m²',
        areaIndex: 3,
        isActive: false
    }, {
        name: '110-130m²',
        areaIndex: 4,
        isActive: false
    }, {
        name: '130-150m²',
        areaIndex: 5,
        isActive: false
      }, {
        name: '150m²以上',
        areaIndex: 6,
        isActive: false
      }]
    , conditions: { 
          city: [], 
          city_address: [], 
          metro:[],
          house_type: [], 
          acreage:[]
        },
      ways:['城区','地铁'],
      waysIndex: 0,
      //  regions: ['不限','高新区','天府新区','锦江区','青羊区', '金牛区', '成华区'],
    regions: [{ name:'不限',checked:true},
     { name:'高新区'},
     {name:'天府新区'},
     {name: '锦江区'}],
     regionsIndex: 0,
    towns: [{ name: 'all', value: '不限', checked: true },
      { name: 'dongyuan', value: '东苑', checked: null},
      { name: 'zhonghe', value: '中和', checked: null },
      { name: 'dayuan', value: '大源', checked: null },
      { name: 'chaungyelu', value: '创业路', checked: null },
      { name: 'tianfugreatewall', value: '天府长城', checked: null },
      { name: 'yijia', value: '宜家', checked: null}],
    townsIndex: null,
    isSelectedAll: true,
    metros: [{
      name: '1号线',
      metroIndex: 0,
      isActive: false
    }, {
        name: '2号线',
        metroIndex: 1,
        isActive: false
      }, {
        name: '3号线',
        metroIndex: 2,
        isActive: false
      }, {
        name: '4号线',
        metroIndex: 3,

        isActive: false
      }, {
        name: '7号线',
        metroIndex: 4,
        isActive: false
      }, {
        name: '10号线',
        metroIndex: 5,
        isActive: false
      }],
      metroIndex: null

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabChange(e) {
      let index = e.currentTarget.dataset.tabindex;
      if(index == this.data.currentIndex){
        this.setData({
          currentIndex: null,
        })
      }else{
        this.setData({
          currentIndex: index
        })
      }
     
    },
    // 选择区域的不同类型
    selectedWays(e) {
      let index = e.currentTarget.dataset.wayindex;
      this.setData({
        waysIndex: index
      })
    },
    // 选取区域
    selectRegions(e) {
      let regionindex = e.currentTarget.dataset.regionindex;
      // console.log(regionindex)
      let regions = this.data.regions;
      let conditions = this.data.conditions;
      conditions.city = [];
      regions.map((item,index)=>{
          if(regionindex == index){
              item.checked = 'true'
              conditions.city.push(regions[regionindex].name);
          }else{
            item.checked = null;
          }
      })
      let towns = []
      if (regionindex == 2)
     {
        towns = [{ name: 'all', value: '不限', checked: true },
        { name: 'dongyuan', value: '华阳', checked: null },
        { name: 'zhonghe', value: '五根松', checked: null },
        { name: 'dayuan', value: '海昌路', checked: null }]
     }
    else  if(regionindex == 0|| regionindex == 1){
       towns = [{ name: 'all', value: '不限', checked: true },
       { name: 'dongyuan', value: '东苑', checked: null },
       { name: 'zhonghe', value: '中和', checked: null },
       { name: 'dayuan', value: '大源', checked: null },
       { name: 'chaungyelu', value: '创业路', checked: null },
       { name: 'tianfugreatewall', value: '天府长城', checked: null },
       { name: 'yijia', value: '宜家', checked: null }]
     }
      this.setData({
        regions: regions,
        regionsIndex: regionindex,
        towns: towns
      })
    },
    selectTownAll() {
      let conditions = this.data.conditions;
      conditions.city_address = [];
      let towns = this.data.towns;
      towns.map( item => {
        item.checked = null
      })
        this.setData({
          conditions:conditions,
          isSelectedAll: true,
          towns:towns
        })
    },
    // 选取town
    checkboxChange(e) {
      this.setData({
        isSelectedAll: false
      })
      let towns = this.data.towns;
      let conditions = this.data.conditions;
      let arr = e.detail.value;     
      conditions.city_address = [];
      // console.log(arr)
      arr.map( item => {
        conditions.city_address.push(item)
      })
     towns.map( item => {
       item.checked = null;
     })
     for( let i= 0 ;i< arr.length; i++){
       towns.map( item => {
         if(item.name == arr[i]){
           item.checked= true
         }
       })
     }
      this.setData({
        conditions:conditions,
        towns:towns
      })
    },
    // 选取地铁线
    selectMetro(e) {
      let metroIndex = e.currentTarget.dataset.metroindex;
      let conditions = this.data.conditions;
      let metros = this.data.metros;
      console.log(metros)
      if (metros[metroIndex].isActive){
        metros[metroIndex].isActive = false;
        conditions.metro.pop(this.data.metros[metroIndex].name)
      }else{
        metros[metroIndex].isActive = true;
        conditions.metro.push(this.data.metros[metroIndex].name)
      }
      
      // console.log(conditions)
      this.setData({
        conditions: conditions,
        metros: metros
      })
    },
    // 选取户型
    selectType(e) {
      let typeIndex = e.currentTarget.dataset.typeindex;      
      let conditions=this.data.conditions;
      let houseType = this.data.houseType;
      if (houseType[typeIndex].isActive){
        houseType[typeIndex].isActive = false;
        conditions.house_type.pop(this.data.houseType[typeIndex].name)
      }else{
        houseType[typeIndex].isActive = true;
        conditions.house_type.push(this.data.houseType[typeIndex].name)
      }
     
      this.setData({
        conditions: conditions,
        houseType: houseType
      })
    },
    // 面积选择
    selectArea(e) {
      let areaIndex = e.currentTarget.dataset.areaindex;
      let conditions = this.data.conditions;
      let houseArea = this.data.houseArea;
      if (houseArea[areaIndex].isActive) {
        houseArea[areaIndex].isActive = false;
        conditions.acreage.pop(this.data.houseArea[areaIndex].name)
      }else {
        houseArea[areaIndex].isActive = true;
        conditions.acreage.push(this.data.houseArea[areaIndex].name)
      }     
      this.setData({
        conditions: conditions,
        houseArea: houseArea
      })
    },
    handleClear() {
      let houseType = this.data.houseType;
        houseType.map((item) => {
            item.isActive = false;
        })
      let houseArea = this.data.houseArea;
        houseArea.map((item) => {
          item.isActive = false;
        })
      let metro = this.data.metros;
      metro.map((item) => {
        item.isActive = false;
      })
      let regions = this.data.regions;
      regions.map( (item, index) => {
        if(index == 0){
          item.checked = true;
        } else {
          item.checked = null;
        }
      })
      let towns = this.data.towns;
      towns.map((item, index) => {
        if (index == 0) {
          item.checked = true;
        } else {
          item.checked = null;
        }
      })
     
      this.setData({
        conditions: {
          city: [],
          city_address: [],
          house_type: [],
          acreage: [],
          metro:[]
        },
        currentIndex:null,
        waysIndex: 0,
        regionsIndex: 0,
        regions:regions,
        towns:towns,
        houseType:houseType,
        houseArea: houseArea,
        metros:metro
      })
      // console.log(this.data)
    },
    confirm() {
      const _this = this;
      const conditions = this.data.conditions;
      if(conditions.city.length == 0){
        conditions.city = ''
      }
      if (conditions.city_address.length == 0) {
        conditions.city_address = ''
      }
      if (conditions.metro.length == 0) {
        conditions.metro = ''
      }
      if (conditions.house_type.length == 0) {
        conditions.house_type = ''
      }
      if (conditions.acreage.length == 0) {
        conditions.acreage = ''
      }
      wx.get(api.getConditionHouse,{       
        conditions: JSON.stringify(conditions)

      }).then( res => {
        // console.log(res)
        if( res.data.code == 0){
          const myEventDetail = res.data.data;
          const myEventOption = {};
          this.triggerEvent('getConditions', myEventDetail, myEventOption)
          _this.setData({
            currentIndex: null
          })
        }
      }).catch( error => {
        // console.log(error)
      })
      console.log(conditions)
    }
  }
})
