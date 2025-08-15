/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 图片优化
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 国际化支持
  i18n: {
    locales: ['zh-CN', 'en'],
    defaultLocale: 'zh-CN',
  },
  
  // 压缩配置
  compress: true,
  
  // 输出静态文件 - 在Vercel中禁用以避免冲突
  // trailingSlash: true,
  
  // 环境变量
  env: {
    SITE_URL: process.env.SITE_URL || 'https://chaosbtc.com',
    SITE_NAME: '区块链资讯 - 比特币虚拟币专业平台',
  },
  
  // 头部配置 - 暂时注释掉以避免冲突
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'origin-when-cross-origin',
  //         },
  //       ],
  //     },
  //   ]
  // },
  
  // 重定向配置 - 暂时注释掉以避免冲突
  // async redirects() {
  //   return [
  //     {
  //       source: '/bitcoin',
  //       destination: '/crypto/bitcoin',
  //       permanent: true,
  //     },
  //     {
  //       source: '/虚拟币',
  //       destination: '/crypto',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
