# 静态资源准备指南

本项目需要准备以下静态资源文件。

## 音频文件 (assets/audio/)

需要在 `assets/audio/` 目录下放置以下 8 个音频文件:

| 文件名 | 说明 | 建议时长 |
|--------|------|----------|
| rain-light.mp3 | 细雨声 | 3-5分钟 |
| rain-heavy.mp3 | 大雨声 | 3-5分钟 |
| cafe.mp3 | 咖啡馆背景音 | 3-5分钟 |
| campfire.mp3 | 篝火燃烧声 | 3-5分钟 |
| forest.mp3 | 森林鸟鸣风声 | 3-5分钟 |
| ocean.mp3 | 海浪拍岸声 | 3-5分钟 |
| office.mp3 | 办公室背景音 | 3-5分钟 |
| train.mp3 | 火车行驶声 | 3-5分钟 |

### 音频格式要求

- **格式**: MP3 (优先,兼容性最好)
- **采样率**: 44.1kHz
- **比特率**: 128kbps
- **时长**: 3-5 分钟的循环片段
- **大小**: 建议每个文件小于 5MB

### 免费音频资源推荐

以下网站提供免费可商用的白噪音:

1. **freesound.org** (推荐)
   - 搜索关键词: "rain", "cafe", "campfire", "forest", "ocean"
   - 筛选条件: "Creative Commons 0 License" (CC0)
   - 网址: https://freesound.org/

2. **Pixabay Audio**
   - 提供免费音效和背景音
   - 网址: https://pixabay.com/music/sound-effects/

3. **Zapsplat**
   - 免费注册后可下载
   - 网址: https://www.zapsplat.com/

### 本地录制方案

如果想要真实环境音,可以使用手机录制:

1. **细雨/大雨**: 在雨天录制
2. **咖啡馆**: 找一个安静的咖啡馆录制
3. **篝火**: 户外篝火时录制
4. **森林**: 到公园或郊外录制
5. **海浪**: 海边录制
6. **办公室**: 工位上录制(注意隐私)

录制建议:
- 使用手机录音应用
- 尽量减少背景杂音
- 录制3-5分钟的循环片段
- 导出为MP3格式

## 图标文件 (assets/icons/)

需要在 `assets/icons/` 目录下放置以下 8 个图标文件:

### TabBar 图标

| 文件名 | 说明 | 状态 |
|--------|------|------|
| home.png | 首页图标 | 未选中 |
| home-active.png | 首页图标 | 选中 |
| checkin.png | 打卡图标 | 未选中 |
| checkin-active.png | 打卡图标 | 选中 |
| sound.png | 声音图标 | 未选中 |
| sound-active.png | 声音图标 | 选中 |
| mine.png | 我的图标 | 未选中 |
| mine-active.png | 我的图标 | 选中 |

### 图标格式要求

- **格式**: PNG (支持透明背景)
- **尺寸**: 81px × 81px (微信小程序TabBar图标标准尺寸)
- **颜色**:
  - 未选中: 灰色 (#B0B0B0)
  - 选中: 蓝色 (#4A90D9)
- **风格**: 简约、扁平化设计

### 图标设计建议

1. **首页图标 (home)**
   - 房子形状
   - 或日历/时钟形状

2. **打卡图标 (checkin)**
   - 勾选符号
   - 或记事本形状

3. **声音图标 (sound)**
   - 音符形状
   - 或扬声器形状

4. **我的图标 (mine)**
   - 人像形状
   - 或用户头像形状

### 免费图标资源

1. **Iconfont (阿里巴巴矢量图标库)**
   - 网址: https://www.iconfont.cn/
   - 搜索相关关键词下载

2. **IconPark (字节跳动)**
   - 网址: https://iconpark.oceanengine.com/
   - 免费可商用,支持下载PNG

3. **Flaticon**
   - 网址: https://www.flaticon.com/
   - 注意查看授权信息

4. **Heroicons**
   - 网址: https://heroicons.com/
   - 开源免费图标,可以转换为PNG

## 目录结构

准备完成后,目录结构应该是:

```
jieyaben/
├── assets/
│   ├── audio/              # 音频文件目录
│   │   ├── rain-light.mp3
│   │   ├── rain-heavy.mp3
│   │   ├── cafe.mp3
│   │   ├── campfire.mp3
│   │   ├── forest.mp3
│   │   ├── ocean.mp3
│   │   ├── office.mp3
│   │   └── train.mp3
│   └── icons/              # 图标文件目录
│       ├── home.png
│       ├── home-active.png
│       ├── checkin.png
│       ├── checkin-active.png
│       ├── sound.png
│       ├── sound-active.png
│       ├── mine.png
│       └── mine-active.png
```

## 创建目录

在项目根目录执行以下命令创建资源目录:

```bash
mkdir -p assets/audio
mkdir -p assets/icons
```

## 注意事项

1. **音频版权**: 确保使用的音频文件具有合法的使用授权
2. **图标版权**: 确保图标可以免费商用或具有授权
3. **文件大小**: 控制音频和图标文件大小,避免影响小程序加载速度
4. **测试资源**: 可以先使用短音频片段进行测试,后续再替换完整版本
5. **命名规范**: 文件名必须与代码中引用的文件名完全一致(区分大小写)
 
## 资源检查清单

- [ ] 创建 `assets/audio/` 目录
- [ ] 创建 `assets/icons/` 目录
- [ ] 准备 8 个音频文件 (MP3格式)
- [ ] 准备 8 个图标文件 (PNG格式, 81×81px)
- [ ] 确认音频文件可以正常循环播放
- [ ] 确认图标文件透明背景正常显示

