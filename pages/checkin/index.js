const storage = require('../../utils/storage');
const { generateUUID } = require('../../utils/uuid');
const date = require('../../utils/date');
const config = require('../../constants/config');

const ALL_TAGS = ['焦虑', '疲惫', '平静', '开心', '烦躁', '迷茫', '无力', '期待', '充实', '失落'];

Page({
  data: {
    todayChecked: false,
    score: 5,
    selectedTags: [],
    note: '',
    isSubmitting: false,
    completed: false,
    tagStatus: {}
  },

  onLoad() {
    this.checkTodayStatus();
    this.initTagStatus();
  },

  onShow() {
    this.checkTodayStatus();
  },

  initTagStatus() {
    const tagStatus = {};
    ALL_TAGS.forEach(tag => {
      tagStatus[tag] = false;
    });
    this.setData({ tagStatus });
  },

  checkTodayStatus() {
    const today = date.getToday();
    const checkinRecords = storage.get(config.storageKeys.checkinRecords) || [];
    const todayChecked = checkinRecords.some(r => r.date === today);
    this.setData({ todayChecked });
  },

  onScoreChange(e) {
    this.setData({ score: parseInt(e.detail.value) });
  },

  toggleTag(e) {
    const tag = e.currentTarget.dataset.tag;
    let selectedTags = [...this.data.selectedTags];
    const tagStatus = { ...this.data.tagStatus };

    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      selectedTags.splice(index, 1);
      tagStatus[tag] = false;
    } else {
      if (selectedTags.length >= 3) {
        wx.showToast({
          title: '最多选择3个标签',
          icon: 'none'
        });
        return;
      }
      selectedTags.push(tag);
      tagStatus[tag] = true;
    }

    this.setData({
      selectedTags,
      tagStatus
    });
  },

  onNoteInput(e) {
    this.setData({ note: e.detail.value });
  },

  handleSubmit() {
    if (this.data.isSubmitting) return;

    if (this.data.selectedTags.length === 0) {
      wx.showToast({
        title: '请至少选择1个情绪标签',
        icon: 'none'
      });
      return;
    }

    const today = date.getToday();
    const checkinRecords = storage.get(config.storageKeys.checkinRecords) || [];
    const todayRecord = checkinRecords.find(r => r.date === today);

    if (todayRecord) {
      wx.showModal({
        title: '提示',
        content: '今天已经记录过了',
        confirmText: '查看月历',
        cancelText: '好的',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/checkin/calendar'
            });
          }
        }
      });
      return;
    }

    this.setData({ isSubmitting: true });

    const record = {
      id: generateUUID(),
      date: today,
      score: this.data.score,
      tags: this.data.selectedTags,
      note: this.data.note,
      createdAt: Date.now()
    };

    checkinRecords.push(record);
    storage.set(config.storageKeys.checkinRecords, checkinRecords);

    this.setData({ completed: true, isSubmitting: false });
  },

  goToCalendar() {
    wx.navigateTo({
      url: '/pages/checkin/calendar'
    });
  }
});
