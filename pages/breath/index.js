const storage = require('../../utils/storage');
const config = require('../../constants/config');

Page({
  data: {
    phase: 'idle', // idle, inhale, hold, exhale
    countdown: 0,
    round: 0,
    totalRounds: 3,
    isRunning: false,
    completed: false,
    phaseText: '准备开始',
    phaseColor: '#4A90D9',
    circleScale: 1
  },

  onLoad() {
    // 加载累计呼吸次数
    const breathCount = storage.get(config.storageKeys.breathCount) || 0;
    this.setData({ breathCount });
    this.updateDisplayData();
  },

  onUnload() {
    // 页面卸载时清除计时器
    this.clearTimer();
  },

  // 清除计时器
  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  // 更新显示数据
  updateDisplayData() {
    const { phase } = this.data;
    const phaseTexts = {
      idle: '准备开始',
      inhale: '吸气',
      hold: '屏息',
      exhale: '呼气'
    };
    const phaseColors = {
      idle: '#4A90D9',
      inhale: '#4A90D9',
      hold: '#4A90D9',
      exhale: '#FFB347'
    };
    const scales = {
      idle: 1,
      inhale: 1.3,
      hold: 1.3,
      exhale: 0.8
    };
    this.setData({
      phaseText: phaseTexts[phase] || '',
      phaseColor: phaseColors[phase] || '#4A90D9',
      circleScale: scales[phase] || 1
    });
  },

  // 开始/暂停
  toggleBreath() {
    if (this.data.isRunning) {
      // 暂停
      this.pause();
    } else {
      // 开始
      this.start();
    }
  },

  // 开始呼吸
  start() {
    if (this.data.completed) {
      // 重新开始
      this.setData({
        phase: 'inhale',
        countdown: 4,
        round: 1,
        isRunning: true,
        completed: false
      });
      this.updateDisplayData();
    } else if (this.data.phase === 'idle') {
      // 首次开始
      this.setData({
        phase: 'inhale',
        countdown: 4,
        round: 1,
        isRunning: true
      });
      this.updateDisplayData();
    } else {
      // 继续之前的呼吸
      this.setData({ isRunning: true });
    }

    this.startTimer();
  },

  // 暂停
  pause() {
    this.clearTimer();
    this.setData({ isRunning: false });
  },

  // 开始计时器
  startTimer() {
    this.clearTimer();

    this.timer = setInterval(() => {
      const { phase, countdown, round, totalRounds } = this.data;

      if (countdown > 1) {
        // 倒计时继续
        this.setData({ countdown: countdown - 1 });
      } else {
        // 切换阶段
        this.nextPhase();
      }
    }, 1000);
  },

  // 切换到下一阶段
  nextPhase() {
    const { phase, round, totalRounds } = this.data;

    switch (phase) {
      case 'inhale':
        // 吸气 -> 屏息
        this.setData({
          phase: 'hold',
          countdown: 7
        });
        this.updateDisplayData();
        break;

      case 'hold':
        // 屏息 -> 呼气
        this.setData({
          phase: 'exhale',
          countdown: 8
        });
        this.updateDisplayData();
        break;

      case 'exhale':
        // 呼气 -> 下一轮
        if (round < totalRounds) {
          this.setData({
            phase: 'inhale',
            countdown: 4,
            round: round + 1
          });
          this.updateDisplayData();
        } else {
          // 完成
          this.complete();
        }
        break;

      default:
        break;
    }
  },

  // 完成
  complete() {
    this.clearTimer();
    this.setData({
      phase: 'idle',
      countdown: 0,
      isRunning: false,
      completed: true
    });
    this.updateDisplayData();

    // 保存累计呼吸次数
    let breathCount = storage.get(config.storageKeys.breathCount) || 0;
    breathCount += this.data.totalRounds;
    storage.set(config.storageKeys.breathCount, breathCount);
  },

  // 再来一组
  restart() {
    this.setData({
      phase: 'inhale',
      countdown: 4,
      round: 1,
      isRunning: true,
      completed: false
    });
    this.updateDisplayData();
    this.startTimer();
  },

  // 返回
  goBack() {
    wx.navigateBack();
  }
});
