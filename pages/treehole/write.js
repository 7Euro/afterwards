const storage = require('../../utils/storage');
const { generateUUID } = require('../../utils/uuid');
const date = require('../../utils/date');
const config = require('../../constants/config');

Page({
  data: {
    content: '',
    statusBarHeight: 0,
    isDestroying: false,
    healingQuote: ''
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({ statusBarHeight: systemInfo.statusBarHeight });
  },

  // 输入内容
  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  // 烧掉
  handleBurn() {
    if (this.data.isDestroying) return;

    if (!this.data.content.trim()) {
      wx.showModal({
        title: '提示',
        content: '真的没有什么想说的吗?',
        confirmText: '确定',
        showCancel: false,
        success: () => {
          wx.navigateBack();
        }
      });
      return;
    }

    this.setData({ isDestroying: true });

    // 播放销毁动画
    this.playDestroyAnimation().then(() => {
      // 显示随机治愈短句
      const randomQuote = config.healingQuotes[Math.floor(Math.random() * config.healingQuotes.length)];
      this.setData({ healingQuote: randomQuote, isDestroying: false });
    });
  },

  // 销毁动画
  playDestroyAnimation() {
    return new Promise((resolve) => {
      // 使用CSS动画实现销毁效果
      const that = this;
      wx.createSelectorQuery()
        .select('.content-textarea')
        .boundingClientRect((rect) => {
          if (rect) {
            // 2秒后完成动画
            setTimeout(() => {
              that.setData({ content: '' });
              resolve();
            }, 2000);
          }
        })
        .exec();
    });
  },

  // 保存草稿
  handleSave() {
    if (!this.data.content.trim()) {
      wx.showToast({
        title: '写点什么吧',
        icon: 'none',
        duration: 1500
      });
      return;
    }

    const draft = {
      id: generateUUID(),
      content: this.data.content,
      createdAt: Date.now()
    };

    const drafts = storage.get(config.storageKeys.treeholeDrafts) || [];
    drafts.unshift(draft);
    storage.set(config.storageKeys.treeholeDrafts, drafts);

    wx.showToast({
      title: '已保存',
      icon: 'success',
      duration: 1500,
      complete: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  },

  // 返回首页
  handleBackHome() {
    wx.navigateBack();
  }
});
