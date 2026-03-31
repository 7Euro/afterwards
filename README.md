# 解压本 - 微信小程序

一款面向城市职场人群的轻量级情绪解压工具,主打**文字倾诉 + 声音疗愈**,纯工具无社交,完全免费,数据本地优先。

## 产品定位

每天给自己5分钟,让情绪有个出口。

## 核心功能

### 1. 情绪树洞
- 文字倾诉,写下任何想说的话
- 一键"烧掉"销毁,永久删除
- 保存草稿,随时回顾

### 2. 情绪打卡
- 每日情绪评分(1-10分)
- 选择情绪标签
- 一句话备注
- 情绪月历查看历史记录

### 3. 声音空间
- 8种白噪音场景
- 支持最多3种声音混音
- 独立音量控制
- 悬浮播放条

### 4. 呼吸引导
- 吸气4秒 → 屏息7秒 → 呼气8秒
- 视觉引导圆圈
- 倒计时提示
- 可自定义轮数

## 技术栈

- 微信小程序原生开发
- 最低基础库: 2.25.0
- 数据存储: wx.setStorageSync (本地存储)

## 项目结构

```
jieyaben/
├── app.js                    # 应用入口
├── app.json                  # 全局配置
├── app.wxss                  # 全局样式
├── sitemap.json              # SEO配置
├── project.config.json       # 微信开发者工具配置
├── README.md                 # 项目说明
│
├── pages/                    # 页面目录
│   ├── index/                # 首页
│   ├── treehole/             # 情绪树洞
│   │   ├── write/            # 书写页
│   │   ├── drafts/           # 草稿箱
│   │   └── draft-detail/     # 草稿详情
│   ├── checkin/              # 情绪打卡
│   │   ├── index/            # 打卡页
│   │   └── calendar/         # 月历页
│   ├── sound/                # 声音空间
│   ├── breath/               # 呼吸引导
│   └── mine/                 # 我的
│
├── utils/                    # 工具函数
│   ├── storage.js            # 存储封装
│   ├── uuid.js               # UUID生成
│   └── date.js               # 日期格式化
│
├── constants/                # 常量
│   └── config.js             # 全局配置
│
└── assets/                   # 静态资源
    ├── audio/                # 白噪音音频文件
    └── icons/                # TabBar图标
```

## 快速开始

### 1. 安装微信开发者工具

从官网下载并安装: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

### 2. 导入项目

1. 打开微信开发者工具
2. 点击"导入项目"
3. 选择本项目目录
4. 填写 AppID(测试可以使用测试号)
5. 点击"导入"

### 3. 准备音频文件

在 `assets/audio/` 目录下放置以下音频文件(需要自己准备):

- rain-light.mp3 (细雨)
- rain-heavy.mp3 (大雨)
- cafe.mp3 (咖啡馆)
- campfire.mp3 (篝火)
- forest.mp3 (森林)
- ocean.mp3 (海浪)
- office.mp3 (办公室)
- train.mp3 (火车)

音频格式要求:
- 格式: MP3
- 采样率: 44.1kHz
- 比特率: 128kbps
- 时长: 3-5分钟循环片段

### 4. 准备图标文件

在 `assets/icons/` 目录下放置TabBar图标文件(需要自己准备):

- home.png (首页图标)
- home-active.png (首页选中图标)
- checkin.png (打卡图标)
- checkin-active.png (打卡选中图标)
- sound.png (声音图标)
- sound-active.png (声音选中图标)
- mine.png (我的图标)
- mine-active.png (我的选中图标)

图标尺寸建议: 81px × 81px

### 5. 配置 AppID

修改 `project.config.json` 文件中的 `appid` 字段为你的小程序 AppID。

```json
{
  "appid": "your_appid_here"
}
```

### 6. 构建 npm (可选)

如果需要使用第三方依赖,执行:

```
工具 -> 构建 npm
```

## 开发说明

### 本地存储

所有数据存储在微信本地,使用 `wx.setStorageSync`:

- `treehole_drafts`: 草稿列表
- `checkin_records`: 打卡记录
- `sound_preferences`: 声音偏好
- `breath_count`: 累计呼吸次数
- `firstOpenTime`: 首次打开时间

### 样式规范

全局颜色变量:

```css
--color-primary: #4A90D9;     /* 主蓝 */
--color-primary-dark: #3A7BC8;
--color-secondary: #FFB347;   /* 暖橙 */
--color-danger: #FF6B6B;      /* 销毁红 */
--color-bg-dark: #1a1a2e;      /* 深色背景 */
--color-bg-card: #16213e;
```

### 页面跳转

使用 `wx.navigateTo` 或 `wx.switchTab` 进行页面跳转:

```javascript
// 普通页面跳转
wx.navigateTo({
  url: '/pages/treehole/write'
});

// TabBar页面跳转
wx.switchTab({
  url: '/pages/checkin/index'
});
```

## 合规说明

### 适龄提示

在微信小程序后台填写"16+"

### 隐私政策

所有数据存储在用户设备本地,不收集、上传或共享任何个人信息。

### 音频版权

使用免费可商用的白噪音素材(如 freesound.org CC0 授权)。

### 类目选择

建议选择: "工具 > 便签/笔记" 或 "生活服务"

## 注意事项

1. **音频文件**: 需要自己准备白噪音音频文件并放在 `assets/audio/` 目录
2. **图标文件**: 需要自己准备TabBar图标并放在 `assets/icons/` 目录
3. **AppID**: 需要在微信小程序后台注册并填写正确的AppID
4. **真机测试**: 建议在真机上测试音频播放功能

## 版本历史

### v1.0.0 (2026-03-29)
- 初始版本发布
- 实现情绪树洞功能
- 实现情绪打卡功能
- 实现声音空间功能
- 实现呼吸引导功能

## 许可证

MIT License

## 联系方式

如有问题或建议,欢迎反馈。
