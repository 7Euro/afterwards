const storage = require('../../utils/storage');
const { generateUUID } = require('../../utils/uuid');
const config = require('../../constants/config');

Page({
  data: {
    draftCount: 0,
    todayChecked: false,
    statusBarHeight: 0
  },

  onLoad() {
    this.getStatusBarHeight();
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  // 获取状态栏高度
  getStatusBarHeight() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({ statusBarHeight: systemInfo.statusBarHeight });
  },

  // 加载数据
  loadData() {
    const drafts = storage.get(config.storageKeys.treeholeDrafts) || [];
    const today = require('../../utils/date').getToday();
    const checkinRecords = storage.get(config.storageKeys.checkinRecords) || [];
    const todayChecked = checkinRecords.some(r => r.date === today);

    this.setData({
      draftCount: drafts.length,
      todayChecked
    });
  },

  // 前往书写页
  goToWrite() {
    wx.navigateTo({
      url: '/pages/treehole/write'
    });
  },

  // 前往打卡页
  goToCheckin() {
    wx.switchTab({
      url: '/pages/checkin/index'
    });
  },

  // 前往声音空间
  goToSound() {
    wx.switchTab({
      url: '/pages/sound/index'
    });
  },

  // 前往呼吸引导
  goToBreath() {
    wx.navigateTo({
      url: '/pages/breath/index'
    });
  },

  // 前往我的页面
  goToMine() {
    wx.switchTab({
      url: '/pages/mine/index'
    });
  }
});
