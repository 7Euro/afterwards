# 解压本小程序 - 部署配置指南

## 快速部署步骤

### 方式一: 使用部署脚本(推荐)

```bash
cd /Users/tata/CodeBuddy/afterwards
./deploy.sh
```

脚本会自动完成以下操作:
- 检查环境(Node.js、npm)
- 安装CloudBase CLI(如果需要)
- 检查配置(AppID、环境ID)
- 检查资源文件
- 登录CloudBase
- 部署到CloudBase

### 方式二: 手动部署

#### 步骤1: 配置AppID

编辑 `project.config.json` 文件,将第44行的 `appid` 修改为您的真实AppID:

```json
{
  "appid": "wx1234567890abcdef"  // 替换为您的AppID
}
```

#### 步骤2: 配置CloudBase环境ID

编辑 `cloudbaserc.json` 文件,将 `envId` 修改为您的CloudBase环境ID:

```json
{
  "envId": "jieyaben-xxxxx"  // 替换为您的环境ID
}
```

**获取环境ID:**
1. 访问 CloudBase 控制台: https://console.cloud.tencent.com/tcb
2. 登录后进入"环境管理"
3. 创建新环境或选择已有环境
4. 在环境详情中可以看到环境ID

#### 步骤3: 安装CloudBase CLI

```bash
npm install -g @cloudbase/cli --registry=https://registry.npmmirror.com
```

#### 步骤4: 登录CloudBase

```bash
cloudbase login
```

浏览器会自动打开,使用微信扫码登录。

#### 步骤5: 部署到CloudBase

```bash
cloudbase hosting deploy
```

#### 步骤6: 上传小程序代码

1. 打开微信开发者工具
2. 点击"导入项目"
3. 项目目录选择: `/Users/tata/CodeBuddy/afterwards`
4. AppID 使用您的真实AppID
5. 点击"导入"

#### 步骤7: 编译测试

1. 点击"编译"按钮
2. 检查控制台是否有错误
3. 测试各项功能是否正常

#### 步骤8: 上传代码

1. 点击右上角"上传"按钮
2. 填写版本号(如: 1.0.0)
3. 填写项目备注(如: 初始版本发布)
4. 点击"上传"

#### 步骤9: 提交审核

1. 登录微信公众平台: https://mp.weixin.qq.com/
2. 进入"版本管理"
3. 选择刚上传的版本
4. 点击"提交审核"
5. 填写审核信息:
   - **功能页面**: 首页、情绪树洞、情绪打卡、声音空间、呼吸引导、我的
   - **类目**: 工具 > 便签/笔记 或 生活服务
   - **标签**: 解压、情绪、冥想、白噪音、放松
   - **截图**: 上传小程序功能截图(至少1张)
   - **描述**: 一款面向城市职场人群的轻量级情绪解压工具,主打文字倾诉和声音疗愈,纯工具无社交,完全免费。

#### 步骤10: 适龄提示

填写"16+"

#### 步骤11: 隐私政策

在"我的"页面已有隐私政策入口,说明如下:

> 本应用所有数据均存储在您的设备本地,我们不会收集、上传或共享您的任何个人信息。您的情绪记录和草稿内容只有您自己知道。

## 资源文件准备

### 音频文件 (必须)

将以下8个MP3文件放入 `assets/audio/` 目录:

| 文件名 | 说明 | 推荐大小 |
|--------|------|----------|
| rain-light.mp3 | 细雨 | < 5MB |
| rain-heavy.mp3 | 大雨 | < 5MB |
| cafe.mp3 | 咖啡馆 | < 5MB |
| campfire.mp3 | 篝火 | < 5MB |
| forest.mp3 | 森林 | < 5MB |
| ocean.mp3 | 海浪 | < 5MB |
| office.mp3 | 办公室 | < 5MB |
| train.mp3 | 火车 | < 5MB |

**免费音频资源:**
- freesound.org (搜索关键词,筛选CC0授权)
- Pixabay Audio

### 图标文件 (必须)

将以下8个PNG文件放入 `assets/icons/` 目录:

| 文件名 | 说明 | 尺寸 | 颜色 |
|--------|------|------|------|
| home.png | 首页(未选中) | 81×81px | #B0B0B0 |
| home-active.png | 首页(选中) | 81×81px | #4A90D9 |
| checkin.png | 打卡(未选中) | 81×81px | #B0B0B0 |
| checkin-active.png | 打卡(选中) | 81×81px | #4A90D9 |
| sound.png | 声音(未选中) | 81×81px | #B0B0B0 |
| sound-active.png | 声音(选中) | 81×81px | #4A90D9 |
| mine.png | 我的(未选中) | 81×81px | #B0B0B0 |
| mine-active.png | 我的(选中) | 81×81px | #4A90D9 |

**免费图标资源:**
- Iconfont (阿里巴巴矢量图标库)
- IconPark (字节跳动)
- Heroicons

## 常见问题

### Q1: CloudBase CLI 安装失败?

```bash
# 使用国内镜像重试
npm install -g @cloudbase/cli --registry=https://registry.npmmirror.com
```

### Q2: 如何获取AppID?

1. 访问微信公众平台: https://mp.weixin.qq.com/
2. 点击"立即注册"
3. 选择"小程序"
4. 按照指引完成注册
5. 登录后可以在"开发" -> "开发设置"中看到AppID

### Q3: 如何创建CloudBase环境?

1. 访问 CloudBase 控制台: https://console.cloud.tencent.com/tcb
2. 点击"新建环境"
3. 选择"基础版"(免费)或"专业版"
4. 填写环境名称(如: jieyaben)
5. 创建后可以在环境列表中看到环境ID

### Q4: 资源文件还未准备好,可以先部署吗?

可以。但需要注意:
- 音频文件缺失会导致声音空间功能无法使用
- 图标文件缺失会导致TabBar图标无法显示
- 建议先准备部分资源进行测试,后续再补充完整

### Q5: 部署后如何测试?

1. 在微信开发者工具中点击"预览"
2. 使用微信扫描二维码
3. 在手机上查看效果
4. 测试各项功能是否正常

### Q6: 审核需要多长时间?

通常需要1-7个工作日,具体时间由微信审核团队决定。

### Q7: 审核不通过怎么办?

根据审核意见修改后重新提交。常见问题:
- 类目选择错误
- 缺少隐私政策
- 功能描述不清楚
- 截图不符合要求

## 部署检查清单

- [ ] 配置AppID (project.config.json)
- [ ] 配置CloudBase环境ID (cloudbaserc.json)
- [ ] 安装CloudBase CLI
- [ ] 登录CloudBase
- [ ] 准备音频文件 (assets/audio/)
- [ ] 准备图标文件 (assets/icons/)
- [ ] 部署到CloudBase
- [ ] 在微信开发者工具中导入项目
- [ ] 编译测试通过
- [ ] 上传代码
- [ ] 提交审核
- [ ] 等待审核通过
- [ ] 发布上线

## 相关链接

- **CloudBase控制台**: https://console.cloud.tencent.com/tcb
- **微信公众平台**: https://mp.weixin.qq.com/
- **微信开发者工具下载**: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- **微信小程序文档**: https://developers.weixin.qq.com/miniprogram/dev/framework/
- **CloudBase文档**: https://docs.cloudbase.net/

## 技术支持

如有问题,请参考:
- [README.md](./README.md) - 项目说明
- [ASSETS_GUIDE.md](./ASSETS_GUIDE.md) - 资源准备指南
- [QUICKSTART.md](./QUICKSTART.md) - 快速启动指南
- [CLOUDBASE_DEPLOY.md](./CLOUDBASE_DEPLOY.md) - CloudBase部署说明
