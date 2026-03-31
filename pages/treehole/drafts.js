const storage = require('../../utils/storage');
const date = require('../../utils/date');
const config = require('../../constants/config');

Page({
  data: {
    drafts: [],
    startX: 0,
    deleteBtnWidth: 160
  },

  onLoad() {
    this.loadDrafts();
  },

  onShow() {
    this.loadDrafts();
  },

  // 加载草稿列表
  loadDrafts() {
    const drafts = storage.get(config.storageKeys.treeholeDrafts) || [];
    // 按创建时间倒序排列
    drafts.sort((a, b) => b.createdAt - a.createdAt);

    this.setData({ drafts });
  },

  // 触摸开始
  touchStart(e) {
    this.setData({
      startX: e.touches[0].clientX
    });
  },

  // 触摸移动
  touchMove(e) {
    const index = e.currentTarget.dataset.index;
    const { startX, deleteBtnWidth, drafts } = this.data;
    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;

    // 更新当前卡片的偏移
    let offset = 0;
    if (diff > 0 && diff < deleteBtnWidth) {
      offset = -diff;
    } else if (diff >= deleteBtnWidth) {
      offset = -deleteBtnWidth;
    } else {
      offset = 0;
    }

    drafts[index].offset = offset;
    this.setData({ drafts });
  },

  // 触摸结束
  touchEnd(e) {
    const index = e.currentTarget.dataset.index;
    const { startX, deleteBtnWidth, drafts } = this.data;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // 判断是否触发删除
    if (diff > deleteBtnWidth / 2) {
      drafts[index].offset = -deleteBtnWidth;
    } else {
      drafts[index].offset = 0;
    }

    this.setData({ drafts });
  },

  // 删除草稿
  deleteDraft(e) {
    const index = e.currentTarget.dataset.index;
    const drafts = this.data.drafts;

    wx.showModal({
      title: '提示',
      content: '确定删除这条草稿?',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          drafts.splice(index, 1);
          storage.set(config.storageKeys.treeholeDrafts, drafts);
          this.setData({ drafts });

          wx.showToast({
            title: '已删除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 查看草稿详情
  viewDraft(e) {
    const draft = e.currentTarget.dataset.draft;
    wx.navigateTo({
      url: `/pages/treehole/draft-detail?id=${draft.id}`
    });
  },

  // 重置卡片位置
  resetCard(e) {
    const index = e.currentTarget.dataset.index;
    const { drafts } = this.data;
    drafts[index].offset = 0;
    this.setData({ drafts });
  }
});
