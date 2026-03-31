# 🚀 解压本小程序 - 立即部署

## ✅ 配置已完成

- **AppID**: wxe2d61517ad75978b
- **环境ID**: dev-7gin6lcx8761d22f
- **项目目录**: /Users/tata/CodeBuddy/afterwards

## 📝 部署步骤(按顺序执行)

### 步骤1: 登录CloudBase

打开终端,执行:

```bash
cloudbase login
```

浏览器会自动打开,使用微信扫码登录。

### 步骤2: 部署到CloudBase

登录成功后,执行:

```bash
cd /Users/tata/CodeBuddy/afterwards
cloudbase hosting deploy
```

或者使用一键部署脚本:

```bash
cd /Users/tata/CodeBuddy/afterwards
./deploy_now.sh
```

### 步骤3: 导入到微信开发者工具

1. 打开微信开发者工具
2. 点击"导入项目"
3. 项目目录: `/Users/tata/CodeBuddy/afterwards`
4. AppID: wxe2d61517ad75978b
5. 项目名称: 解压本
6. 点击"导入"

### 步骤4: 编译测试

1. 在微信开发者工具中点击"编译"
2. 检查控制台是否有错误
3. 测试各项功能:
   - ✅ 首页快捷工具
   - ✅ 情绪树洞(写文字)
   - ✅ 情绪打卡
   - ✅ 声音空间(如果有音频)
   - ✅ 呼吸引导
   - ✅ 我的页面

### 步骤5: 上传代码

1. 点击微信开发者工具右上角"上传"
2. 版本号: `1.0.0`
3. 备注: `初始版本发布`
4. 点击"上传"

### 步骤6: 提交审核

1. 登录微信公众平台: https://mp.weixin.qq.com/
2. 进入"版本管理"
3. 选择刚上传的版本
4. 点击"提交审核"

#### 审核信息:

- **功能页面**: 首页、情绪树洞、情绪打卡、声音空间、呼吸引导、我的
- **类目**: 工具 > 便签/笔记
- **标签**: 解压、情绪、冥想、白噪音、放松
- **截图**: 上传小程序截图(至少1张)
- **描述**: 一款面向城市职场人群的轻量级情绪解压工具,主打文字倾诉和声音疗愈,纯工具无社交,完全免费,数据本地存储。

#### 适龄提示:

16+

#### 隐私政策:

> 本应用所有数据均存储在您的设备本地,我们不会收集、上传或共享您的任何个人信息。您的情绪记录和草稿内容只有您自己知道。

## 📸 准备审核截图

在提交审核前,建议准备以下截图:

1. **首页截图**: 展示快捷工具入口
2. **情绪树洞截图**: 展示书写界面
3. **情绪打卡截图**: 展示打卡表单
4. **声音空间截图**: 展示声音卡片网格
5. **我的页面截图**: 展示统计数据和功能列表

截图要求:
- 分辨率: 至少 1080×1920
- 格式: PNG 或 JPG
- 内容清晰,无马赛克

## ⏱️ 预计时间

- CloudBase部署: 2-5分钟
- 微信开发者工具测试: 10-15分钟
- 代码上传: 2-5分钟
- 审核等待: 1-7个工作日

## ⚠️ 注意事项

### 资源文件提醒

当前项目还需要准备:

**音频文件** (assets/audio/):
- rain-light.mp3 (细雨)
- rain-heavy.mp3 (大雨)
- cafe.mp3 (咖啡馆)
- campfire.mp3 (篝火)
- forest.mp3 (森林)
- ocean.mp3 (海浪)
- office.mp3 (办公室)
- train.mp3 (火车)

**图标文件** (assets/icons/):
- home.png / home-active.png
- checkin.png / checkin-active.png
- sound.png / sound-active.png
- mine.png / mine-active.png

如果没有准备好这些资源:
- 可以先部署代码进行测试
- 审核前需要补充完整
- 详细资源准备指南: [ASSETS_GUIDE.md](./ASSETS_GUIDE.md)

### 审核常见问题

1. **类目错误**: 确保选择"工具 > 便签/笔记"
2. **缺少截图**: 至少上传1张功能截图
3. **描述不清楚**: 详细描述小程序功能和使用场景
4. **标签不相关**: 使用相关标签(解压、情绪、冥想等)
5. **隐私政策**: 在"我的"页面已有隐私政策入口

## 🔍 部署验证

部署完成后,可以执行以下命令验证:

```bash
# 查看部署状态
cloudbase hosting detail

# 查看访问统计
cloudbase hosting detail
```

## 📞 技术支持

如有问题,请查看:

- **DEPLOY_GUIDE.md** - 完整部署指南
- **QUICKSTART.md** - 快速启动指南
- **ASSETS_GUIDE.md** - 资源准备指南
- **FIND_ENV_GUIDE.md** - 环境查找指南

## 🔗 相关链接

- **CloudBase控制台**: https://console.cloud.tencent.com/tcb
- **CloudBase文档**: https://docs.cloudbase.net/
- **微信公众平台**: https://mp.weixin.qq.com/
- **微信开发者工具下载**: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- **微信小程序文档**: https://developers.weixin.qq.com/miniprogram/dev/framework/

## ✨ 完成后

审核通过后,记得:

1. 在微信公众平台点击"发布"
2. 分享给朋友测试
3. 收集用户反馈
4. 后续迭代优化

---

**祝您部署顺利!** 🎉

如有任何问题,随时联系我。
