const storage = require('../../utils/storage');
const date = require('../../utils/date');
const config = require('../../constants/config');

Page({
  data: {
    draft: null,
    draftId: ''
  },

  onLoad(options) {
    const draftId = options.id;
    this.setData({ draftId });

    this.loadDraft(draftId);
  },

  // 加载草稿详情
  loadDraft(draftId) {
    const drafts = storage.get(config.storageKeys.treeholeDrafts) || [];
    const draft = drafts.find(d => d.id === draftId);

    if (draft) {
      wx.setNavigationBarTitle({
        title: date.formatDateTime(draft.createdAt)
      });
      this.setData({ draft });
    } else {
      wx.showToast({
        title: '草稿不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 删除草稿
  handleDelete() {
    wx.showModal({
      title: '提示',
      content: '确定删除这条草稿?',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          const { draftId } = this.data;
          let drafts = storage.get(config.storageKeys.treeholeDrafts) || [];
          drafts = drafts.filter(d => d.id !== draftId);
          storage.set(config.storageKeys.treeholeDrafts, drafts);

          wx.showToast({
            title: '已删除',
            icon: 'success'
          });

          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      }
    });
  }
});
