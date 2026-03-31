// 日期格式化工具
const date = {
  // 格式化日期: 2026-03-29
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 格式化时间: 3月29日 19:21
  formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${month}月${day}日 ${hour}:${minute}`;
  },

  // 获取今天的日期字符串: 2026-03-29
  getToday() {
    return this.formatDate(Date.now());
  },

  // 获取本月的天数
  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  },

  // 获取月份的第一天是星期几 (0-6, 0是周日)
  getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }
};

module.exports = date;
