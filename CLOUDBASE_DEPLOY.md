# CloudBase 部署说明

## 部署前准备

1. 确保已安装微信开发者工具
2. 确保已注册微信小程序并获取AppID
3. 确保项目代码已完成并测试通过

## 部署步骤

### 方法一: 使用CloudBase CLI部署

#### 1. 安装CloudBase CLI

```bash
npm install -g @cloudbase/cli
```

#### 2. 登录CloudBase

```bash
cloudbase login
```

浏览器会自动打开,使用微信扫码登录。

#### 3. 初始化环境

在项目根目录执行:

```bash
cloudbase init
```

选择:
- 环境: 新建环境或选择已有环境
- 模板: 微信小程序

#### 4. 配置环境ID

编辑 `cloudbaserc.json` 文件,填入环境ID:

```json
{
  "envId": "your-env-id"
}
```

#### 5. 部署静态网站

```bash
cloudbase hosting deploy
```

#### 6. 部署小程序云函数(如果有)

```bash
cloudbase functions:deploy
```

### 方法二: 使用微信开发者工具集成CloudBase

#### 1. 在微信开发者工具中打开项目

#### 2. 开通云开发

- 点击顶部菜单 "云开发"
- 点击"开通"
- 选择基础版(免费)或专业版
- 创建环境,填写环境名称

#### 3. 初始化云开发

在项目根目录创建 `cloudfunctions` 目录:

```bash
mkdir cloudfunctions
```

#### 4. 部署云函数(可选)

如果需要使用云函数,可以在 `cloudfunctions` 目录下创建函数文件夹。

#### 5. 上传小程序代码

- 点击微信开发者工具右上角"上传"
- 填写版本号和备注
- 点击"上传"

#### 6. 提交审核

- 登录微信公众平台: https://mp.weixin.qq.com/
- 进入"版本管理"
- 选择刚上传的版本
- 点击"提交审核"

### 方法三: 使用CloudBase一键部署(推荐)

#### 1. 在项目根目录执行

```bash
cloudbase deploy
```

这将自动部署:
- 静态文件托管
- 云函数(如果有)
- 数据库(如果有)

## 注意事项

1. **环境ID**: 需要在CloudBase控制台获取
2. **资源文件**: 音频和图标文件需要放在 `assets/` 目录下
3. **AppID**: 需要在 `project.config.json` 中配置正确的AppID
4. **域名配置**: 如果使用云开发,需要在小程序后台配置服务器域名

## 常见问题

### Q1: CloudBase CLI安装失败?

A: 尝试使用国内镜像:
```bash
npm install -g @cloudbase/cli --registry=https://registry.npmmirror.com
```

### Q2: 登录失败?

A: 确保已安装Node.js,并且网络连接正常。

### Q3: 部署时提示环境不存在?

A: 需要先在CloudBase控制台创建环境。

### Q4: 如何获取环境ID?

A: 登录CloudBase控制台: https://console.cloud.tencent.com/tcb
在"环境列表"中可以看到环境ID。

## 云开发功能说明

当前项目主要使用本地存储,未集成云开发功能。

如果需要添加云开发功能:

1. **云函数**: 可以在 `cloudfunctions` 目录下创建
2. **云数据库**: 可以使用CloudBase数据库存储数据
3. **云存储**: 可以将音频和图标文件上传到云存储

## 参考文档

- CloudBase官方文档: https://docs.cloudbase.net/
- 微信小程序云开发: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
