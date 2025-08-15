#!/bin/bash

# 区块链资讯网站构建脚本

echo "🚀 开始构建区块链资讯网站..."

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 生成sitemap
echo "🗺️ 生成网站地图..."
npx next-sitemap

# 检查构建结果
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于 .next 目录"
    echo "🌐 可以运行 'npm start' 启动生产服务器"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi
