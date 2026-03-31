#!/bin/bash

# 解压本小程序 - CloudBase 部署脚本

echo "=========================================="
echo "解压本小程序 - CloudBase 部署"
echo "=========================================="
echo ""

# 显示配置信息
echo "📋 当前配置:"
echo "   AppID: wxe2d61517ad75978b"
echo "   环境: dev-7gin6lcx8761d22f"
echo "   项目目录: /Users/tata/CodeBuddy/afterwards"
echo ""

# 检查登录状态
echo "🔍 检查CloudBase登录状态..."

# 如果未登录,提示登录
if ! cloudbase env:list &> /dev/null 2>&1; then
    echo "⚠️  未登录CloudBase,正在打开浏览器登录..."
    echo "请使用微信扫码登录..."
    cloudbase login

    if [ $? -ne 0 ]; then
        echo "❌ 登录失败,请检查网络或重试"
        exit 1
    fi

    echo "✅ 登录成功!"
else
    echo "✅ 已登录CloudBase"
fi

echo ""

# 查看环境列表
echo "📋 查看环境列表..."
cloudbase env:list

echo ""
echo "=========================================="
echo "🚀 开始部署..."
echo "=========================================="
echo ""

# 部署静态文件
echo "📤 正在部署静态文件..."
cloudbase hosting deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功!"
    echo ""
    echo "📱 后续步骤:"
    echo "   1. 打开微信开发者工具"
    echo "   2. 导入项目: /Users/tata/CodeBuddy/afterwards"
    echo "   3. AppID: wxe2d61517ad75978b"
    echo "   4. 点击 '编译' 测试"
    echo "   5. 点击 '上传' 上传代码"
    echo "   6. 在微信公众平台提交审核"
    echo ""
    echo "🌐 CloudBase控制台: https://console.cloud.tencent.com/tcb"
    echo "📱 微信公众平台: https://mp.weixin.qq.com/"
else
    echo ""
    echo "❌ 部署失败,请检查:"
    echo "   - 网络连接"
    echo "   - 环境ID是否正确"
    echo "   - CloudBase权限"
    echo ""
    exit 1
fi
