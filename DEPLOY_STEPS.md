# 部署执行步骤

## 当前状态

✅ AppID 已配置: wxe2d61517ad75978b
✅ Node.js 已安装: v24.14.0
✅ npm 已安装: v11.9.0
✅ CloudBase CLI 已安装
⏳ 需要登录 CloudBase

## 下一步操作

### 步骤1: 登录 CloudBase

在终端执行以下命令:

```bash
cloudbase login
```

浏览器会自动打开,使用微信扫码登录。

### 步骤2: 获取环境ID

登录 CloudBase 控制台: https://console.cloud.tencent.com/tcb

1. 登录后会看到环境列表
2. 点击"新建环境"(如果没有环境)
3. 选择"基础版"(免费)或"专业版"
4. 填写环境名称(如: jieyaben)
5. 创建后复制环境ID(格式如: jieyaben-xxxxx)

### 步骤3: 配置环境ID

编辑 `/Users/tata/CodeBuddy/afterwards/cloudbaserc.json` 文件:

```json
{
  "envId": "你的环境ID"
}
```

### 步骤4: 部署到 CloudBase

```bash
cd /Users/tata/CodeBuddy/afterwards
cloudbase hosting deploy
```

### 步骤5: 导入到微信开发者工具

1. 打开微信开发者工具
2. 点击"导入项目"
3. 项目目录: `/Users/tata/CodeBuddy/afterwards`
4. AppID: wxe2d61517ad75978b (已自动填充)
5. 项目名称: 解压本
6. 点击"导入"

### 步骤6: 编译测试

1. 在微信开发者工具中点击"编译"
2. 检查控制台是否有错误
3. 测试各项功能

### 步骤7: 上传代码

1. 点击右上角"上传"按钮
2. 版本号: 1.0.0
3. 备注: 初始版本发布
4. 点击"上传"

### 步骤8: 提交审核

1. 登录微信公众平台: https://mp.weixin.qq.com/
2. 进入"版本管理"
3. 选择刚上传的版本
4. 点击"提交审核"

### 审核信息填写:

- **功能页面**: 首页、情绪树洞、情绪打卡、声音空间、呼吸引导、我的
- **类目**: 工具 > 便签/笔记
- **标签**: 解压、情绪、冥想、白噪音、放松
- **截图**: 上传小程序截图(至少1张)
- **描述**: 一款面向城市职场人群的轻量级情绪解压工具,主打文字倾诉和声音疗愈,纯工具无社交,完全免费,数据本地存储。

### 适龄提示

16+

### 隐私政策

本应用所有数据均存储在您的设备本地,我们不会收集、上传或共享您的任何个人信息。

## 快速命令参考

```bash
# 登录 CloudBase
cloudbase login

# 查看环境列表
cloudbase env:list

# 部署静态文件
cloudbase hosting deploy

# 查看部署状态
cloudbase hosting detail

# 查看访问链接
cloudbase hosting detail
```

## 注意事项

⚠️ 资源文件提醒:

当前项目还需要准备:
- 音频文件: 8个MP3文件 (assets/audio/)
- 图标文件: 8个PNG文件 (assets/icons/)

如果没有准备好,可以先部署代码进行测试,后续再补充资源文件。

详细资源准备指南请查看: [ASSETS_GUIDE.md](./ASSETS_GUIDE.md)

## 需要帮助?

如果遇到问题,请查看:
- [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) - 完整部署指南
- [QUICKSTART.md](./QUICKSTART.md) - 快速启动指南
- [README.md](./README.md) - 项目说明

## 相关链接

- CloudBase控制台: https://console.cloud.tencent.com/tcb
- 微信公众平台: https://mp.weixin.qq.com/
- 微信开发者工具下载: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
