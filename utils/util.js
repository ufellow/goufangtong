const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
wx.post = (url, data ) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data ? data : {},
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        resolve(res);
      },
      fail: error => {
        reject(error);
      }
    })
  })
};

wx.get = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data ? data : {},
      method: 'GET',
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      success: res => {
        resolve(res);
      },
      fail: error => {
        reject(error);
      }
      
    })
  })
}