const storage = require('../../utils/storage');
const date = require('../../utils/date');
const config = require('../../constants/config');

Page({
  data: {
    userInfo: {
      avatar: '😊',
      name: '今天的你'
    },
    draftCount: 0,
    checkinCount: 0,
    breathCount: 0,
    firstOpenTime: 0,
    version: '1.0.0'
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  // 加载数据
  loadData() {
    const drafts = storage.get(config.storageKeys.treeholeDrafts) || [];
    const checkinRecords = storage.get(config.storageKeys.checkinRecords) || [];
    const breathCount = storage.get(config.storageKeys.breathCount) || 0;
    const firstOpenTime = storage.get(config.storageKeys.firstOpenTime) || Date.now();

    this.setData({
      draftCount: drafts.length,
      checkinCount: checkinRecords.length,
      breathCount,
      firstOpenTime
    });
  },

  // 跳转草稿箱
  goToDrafts() {
    wx.navigateTo({
      url: '/pages/treehole/drafts'
    });
  },

  // 跳转情绪月历
  goToCalendar() {
    wx.navigateTo({
      url: '/pages/checkin/calendar'
    });
  },

  // 跳转隐私政策
  goToPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '本应用所有数据均存储在您的设备本地,我们不会收集、上传或共享您的任何个人信息。您的情绪记录和草稿内容只有您自己知道。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 跳转关于页面
  goToAbout() {
    const { firstOpenTime, version } = this.data;
    const days = Math.floor((Date.now() - firstOpenTime) / (1000 * 60 * 60 * 24));

    wx.showModal({
      title: '关于解压本',
      content: `版本: ${version}\n使用天数: ${days}天\n\n一款面向城市职场人群的轻量级情绪解压工具,主打文字倾诉 + 声音疗愈,纯工具无社交,完全免费,数据本地优先。\n\n每天给自己5分钟,让情绪有个出口。`,
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 清空所有数据
  clearAllData() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有数据吗?此操作不可恢复!',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          // 清空数据,保留首次打开时间
          const firstOpenTime = this.data.firstOpenTime;
          storage.set(config.storageKeys.treeholeDrafts, []);
          storage.set(config.storageKeys.checkinRecords, []);
          storage.set(config.storageKeys.soundPreferences, {});
          storage.set(config.storageKeys.breathCount, 0);

          this.loadData();

          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  }
});
