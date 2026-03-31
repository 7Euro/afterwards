#!/bin/bash

# CloudBase 一键部署脚本

echo "=========================================="
echo "解压本小程序 - CloudBase 部署脚本"
echo "=========================================="
echo ""

# 检查 Node.js 是否安装
echo "1. 检查环境..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装,请先安装 Node.js"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 已安装: $(node -v)"

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

echo "✅ npm 已安装: $(npm -v)"
echo ""

# 检查是否已安装 CloudBase CLI
echo "2. 检查 CloudBase CLI..."

if command -v cloudbase &> /dev/null; then
    echo "✅ CloudBase CLI 已安装: $(cloudbase -v)"
else
    echo "📦 正在安装 CloudBase CLI..."
    npm install -g @cloudbase/cli --registry=https://registry.npmmirror.com

    if [ $? -eq 0 ]; then
        echo "✅ CloudBase CLI 安装成功"
    else
        echo "❌ CloudBase CLI 安装失败"
        exit 1
    fi
fi

echo ""

# 检查 AppID
echo "3. 检查配置..."

APPID=$(grep -o '"appid": "[^"]*"' project.config.json | cut -d'"' -f4)

if [ "$APPID" = "your_appid_here" ]; then
    echo "⚠️  警告: project.config.json 中的 AppID 未配置"
    echo "请先配置您的 AppID"
    echo ""
    read -p "是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ AppID 已配置: $APPID"
fi

echo ""

# 检查 cloudbaserc.json 中的环境ID
ENV_ID=$(grep -o '"envId": "[^"]*"' cloudbaserc.json | cut -d'"' -f4)

if [ "$ENV_ID" = "" ]; then
    echo "⚠️  警告: cloudbaserc.json 中的环境ID 未配置"
    echo ""
    echo "请先完成以下步骤:"
    echo "1. 登录 CloudBase: cloudbase login"
    echo "2. 创建环境或在 CloudBase 控制台获取环境ID"
    echo "3. 在 cloudbaserc.json 中配置 envId"
    echo ""
    read -p "是否现在登录 CloudBase? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cloudbase login
        echo ""
        echo "请在 cloudbaserc.json 中配置您的环境ID"
        echo "环境ID获取地址: https://console.cloud.tencent.com/tcb"
    fi
    exit 1
else
    echo "✅ 环境ID 已配置: $ENV_ID"
fi

echo ""

# 检查资源目录
echo "4. 检查资源文件..."

if [ ! -d "assets/audio" ]; then
    echo "⚠️  audio 目录不存在,正在创建..."
    mkdir -p assets/audio
fi

if [ ! -d "assets/icons" ]; then
    echo "⚠️  icons 目录不存在,正在创建..."
    mkdir -p assets/icons
fi

AUDIO_COUNT=$(find assets/audio -name "*.mp3" 2>/dev/null | wc -l)
ICON_COUNT=$(find assets/icons -name "*.png" 2>/dev/null | wc -l)

echo "📁 音频文件: $AUDIO_COUNT/8"
echo "📁 图标文件: $ICON_COUNT/8"

if [ $AUDIO_COUNT -lt 8 ]; then
    echo "⚠️  音频文件不完整,请参考 ASSETS_GUIDE.md 准备音频文件"
fi

if [ $ICON_COUNT -lt 8 ]; then
    echo "⚠️  图标文件不完整,请参考 ASSETS_GUIDE.md 准备图标文件"
fi

echo ""

# 登录检查
echo "5. 检查登录状态..."

if ! cloudbase env:list &> /dev/null; then
    echo "⚠️  未登录 CloudBase"
    echo ""
    read -p "是否现在登录? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cloudbase login
        if [ $? -eq 0 ]; then
            echo "✅ 登录成功"
        else
            echo "❌ 登录失败"
            exit 1
        fi
    else
        exit 1
    fi
else
    echo "✅ 已登录 CloudBase"
fi

echo ""

# 开始部署
echo "=========================================="
echo "开始部署..."
echo "=========================================="
echo ""

# 部署静态网站
echo "📤 部署静态文件托管..."
cloudbase hosting deploy

if [ $? -eq 0 ]; then
    echo "✅ 静态文件部署成功"
else
    echo "❌ 静态文件部署失败"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ 部署完成!"
echo "=========================================="
echo ""
echo "后续步骤:"
echo "1. 打开微信开发者工具"
echo "2. 导入项目: /Users/tata/CodeBuddy/afterwards"
echo "3. 点击 '上传' 按钮上传代码"
echo "4. 登录微信公众平台提交审核"
echo "5. 等待审核通过后发布"
echo ""
echo "CloudBase 控制台: https://console.cloud.tencent.com/tcb"
echo "微信公众平台: https://mp.weixin.qq.com/"
echo ""
