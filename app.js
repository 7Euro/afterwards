App({
  onLaunch() {
    // 记录首次打开时间
    const firstOpenTime = wx.getStorageSync('firstOpenTime');
    if (!firstOpenTime) {
      wx.setStorageSync('firstOpenTime', Date.now());
    }
  },

  globalData: {
    // 全局数据
    statusBarHeight: 0,
  }
})
