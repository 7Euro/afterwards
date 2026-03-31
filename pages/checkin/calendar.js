const storage = require('../../utils/storage');
const date = require('../../utils/date');
const config = require('../../constants/config');

Page({
  data: {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    calendarDays: [],
    checkinRecords: [],
    showDetail: false,
    selectedRecord: null,
    selectedDate: ''
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  // 加载数据
  loadData() {
    const checkinRecords = storage.get(config.storageKeys.checkinRecords) || [];
    this.setData({ checkinRecords });
    this.generateCalendar();
  },

  // 生成月历
  generateCalendar() {
    const { currentYear, currentMonth } = this.data;
    const today = date.getToday();

    // 获取当月天数
    const daysInMonth = date.getDaysInMonth(currentYear, currentMonth);

    // 获取当月第一天是星期几
    const firstDayOfWeek = date.getFirstDayOfMonth(currentYear, currentMonth);

    // 生成日历数据
    const calendarDays = [];

    // 填充空白天数
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push({
        day: null,
        isToday: false,
        hasRecord: false
      });
    }

    // 填充实际天数
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === today;

      // 查找当天的打卡记录
      const record = this.data.checkinRecords.find(r => r.date === dateStr);
      const hasRecord = !!record;

      calendarDays.push({
        day,
        date: dateStr,
        isToday,
        hasRecord,
        record
      });
    }

    this.setData({ calendarDays });
  },

  // 上一月
  prevMonth() {
    let { currentYear, currentMonth } = this.data;

    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }

    this.setData({ currentYear, currentMonth });
    this.generateCalendar();
  },

  // 下一月
  nextMonth() {
    let { currentYear, currentMonth } = this.data;

    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }

    this.setData({ currentYear, currentMonth });
    this.generateCalendar();
  },

  // 点击日期
  onDayTap(e) {
    const { record } = e.currentTarget.dataset;
    const dateStr = e.currentTarget.dataset.date;

    this.setData({ selectedDate: dateStr });

    if (record) {
      this.setData({
        showDetail: true,
        selectedRecord: record
      });
    }
  },

  // 关闭详情
  closeDetail() {
    this.setData({
      showDetail: false,
      selectedRecord: null
    });
  },

  // 回到今天
  goToToday() {
    const now = new Date();
    this.setData({
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth(),
      selectedDate: date.getToday()
    });
    this.generateCalendar();
  },

  // 获取分数颜色
  getScoreColor(score) {
    if (score >= 9) return config.scoreColors.great;
    if (score >= 7) return config.scoreColors.good;
    if (score >= 4) return config.scoreColors.medium;
    return config.scoreColors.low;
  }
});
