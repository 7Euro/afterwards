const storage = require('../../utils/storage');
const config = require('../../constants/config');

Page({
  data: {
    sounds: [],
    activeSounds: {},
    soundVolumes: {},
    showFloatingBar: false,
    activeSoundCount: 0
  },

  onLoad() {
    this.loadSounds();
    this.loadPreferences();
  },

  onUnload() {
    // 页面卸载时停止所有声音
    this.stopAllSounds();
  },

  // 加载声音列表
  loadSounds() {
    this.setData({ sounds: config.sounds });
  },

  // 加载用户偏好
  loadPreferences() {
    const preferences = storage.get(config.storageKeys.soundPreferences) || {};
    const { activeSounds = {}, soundVolumes = {} } = preferences;

    // 初始化音量
    const volumes = {};
    config.sounds.forEach(sound => {
      volumes[sound.id] = soundVolumes[sound.id] || 60;
    });

    this.setData({
      activeSounds,
      soundVolumes: volumes
    });
  },

  // 保存用户偏好
  savePreferences() {
    const { activeSounds, soundVolumes } = this.data;
    storage.set(config.storageKeys.soundPreferences, {
      activeSounds,
      soundVolumes
    });
  },

  // 计算活跃声音数量
  updateActiveCount() {
    const { activeSounds } = this.data;
    const count = Object.keys(activeSounds).filter(id => activeSounds[id]).length;
    this.setData({ activeSoundCount: count });
  },

  // 切换播放/暂停
  toggleSound(e) {
    const soundId = e.currentTarget.dataset.id;
    const { activeSounds, soundVolumes, activeSoundCount } = this.data;

    if (activeSounds[soundId]) {
      // 暂停
      this.stopSound(soundId);
    } else {
      // 播放
      // 检查是否超过3个
      if (activeSoundCount >= 3) {
        wx.showToast({
          title: '最多同时播放3个声音',
          icon: 'none'
        });
        return;
      }
      this.playSound(soundId);
    }
  },

  // 播放声音
  playSound(soundId) {
    const sound = config.sounds.find(s => s.id === soundId);
    if (!sound) return;

    // 创建音频上下文
    const audioContext = wx.createInnerAudioContext();
    audioContext.src = `/assets/audio/${sound.file}`;
    audioContext.loop = true;
    audioContext.volume = this.data.soundVolumes[soundId] / 100;
    audioContext.obeyMuteSwitch = false;

    audioContext.onPlay(() => {
      console.log(`声音 ${sound.name} 开始播放`);
    });

    audioContext.onError((err) => {
      console.error(`声音 ${sound.name} 播放错误:`, err);
      const errMsg = err.errMsg || '未知错误';
      console.error('详细错误信息:', errMsg);

      // 显示详细的错误信息
      let errorMsg = '音频加载失败';
      if (errMsg.includes('format')) {
        errorMsg = '音频格式不支持';
      } else if (errMsg.includes('network') || errMsg.includes('load')) {
        errorMsg = '音频文件不存在或为空';
      }

      wx.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 2000
      });

      // 播放失败后重置状态
      setTimeout(() => {
        const activeSounds = { ...this.data.activeSounds, [soundId]: false };
        this.setData({ activeSounds });
        this.updateActiveCount();
      }, 100);
    });

    audioContext.play();

    // 更新状态
    const activeSounds = { ...this.data.activeSounds, [soundId]: true };
    const soundContexts = this.data.soundContexts || {};
    soundContexts[soundId] = audioContext;

    this.setData({
      activeSounds,
      soundContexts,
      showFloatingBar: true
    });

    this.updateActiveCount();
    this.savePreferences();
  },

  // 停止声音
  stopSound(soundId) {
    const soundContexts = this.data.soundContexts || {};
    const audioContext = soundContexts[soundId];

    if (audioContext) {
      audioContext.stop();
      audioContext.destroy();
    }

    const activeSounds = { ...this.data.activeSounds, [soundId]: false };

    this.setData({
      activeSounds
    });

    this.updateActiveCount();

    const { activeSoundCount } = this.data;
    this.setData({ showFloatingBar: activeSoundCount > 0 });

    this.savePreferences();
  },

  // 调整音量
  onVolumeChange(e) {
    const soundId = e.currentTarget.dataset.id;
    const volume = parseInt(e.detail.value);
    const soundVolumes = { ...this.data.soundVolumes, [soundId]: volume };

    this.setData({ soundVolumes });

    // 如果正在播放,实时调整音量
    const soundContexts = this.data.soundContexts || {};
    const audioContext = soundContexts[soundId];
    if (audioContext) {
      audioContext.volume = volume / 100;
    }

    this.savePreferences();
  },

  // 停止所有声音
  stopAllSounds() {
    const soundContexts = this.data.soundContexts || {};
    Object.keys(soundContexts).forEach(soundId => {
      const audioContext = soundContexts[soundId];
      if (audioContext) {
        audioContext.stop();
        audioContext.destroy();
      }
    });

    this.setData({
      activeSounds: {},
      showFloatingBar: false,
      soundContexts: {},
      activeSoundCount: 0
    });

    this.savePreferences();
  }
});
