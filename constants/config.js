// 全局配置常量
module.exports = {
  // 情绪标签列表
  emotionTags: ['焦虑', '疲惫', '平静', '开心', '烦躁', '迷茫', '无力', '期待', '充实', '失落'],

  // 治愈短句（销毁后显示）
  healingQuotes: [
    '你已经说出来了,轻了很多吧 🌿',
    '没关系,明天又是新的一天',
    '允许自己这样,是正常的',
    '深呼吸,慢慢来',
    '你已经很棒了',
    '每一步都算数'
  ],

  // 声音配置
  sounds: [
    { id: 'rain_light', name: '细雨', icon: '🌧', file: 'rain-light.wav' },
    { id: 'rain_heavy', name: '大雨', icon: '🌧', file: 'rain-heavy.wav' },
    { id: 'cafe', name: '咖啡馆', icon: '☕', file: 'cafe.wav' },
    { id: 'campfire', name: '篝火', icon: '🔥', file: 'campfire.wav' },
    { id: 'forest', name: '森林', icon: '🌲', file: 'forest.wav' },
    { id: 'ocean', name: '海浪', icon: '🌊', file: 'ocean.wav' },
    { id: 'office', name: '办公室', icon: '💻', file: 'office.wav' },
    { id: 'train', name: '火车', icon: '🚄', file: 'train.wav' }
  ],

  // 情绪分数颜色映射
  scoreColors: {
    low: '#4A90D9',    // 1-3分 深蓝
    medium: '#7FB3E8', // 4-6分 浅蓝
    good: '#FFB347',   // 7-8分 浅橙
    great: '#FF7F50'   // 9-10分 深橙
  },

  // 存储Key
  storageKeys: {
    treeholeDrafts: 'treehole_drafts',
    checkinRecords: 'checkin_records',
    soundPreferences: 'sound_preferences',
    appSettings: 'app_settings',
    firstOpenTime: 'firstOpenTime',
    breathCount: 'breath_count'
  }
};
