import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Bitcoin, Shield, Globe, BarChart3, Users } from 'lucide-react'

// 模拟加密货币数据
const cryptoData = [
  {
    id: 'bitcoin',
    name: '比特币',
    symbol: 'BTC',
    price: 43250.67,
    change: 2.34,
    marketCap: '847.2B',
    volume: '28.5B',
    icon: '₿'
  },
  {
    id: 'ethereum',
    name: '以太坊',
    symbol: 'ETH',
    price: 2650.89,
    change: -1.23,
    marketCap: '318.7B',
    volume: '15.2B',
    icon: 'Ξ'
  },
  {
    id: 'binance-coin',
    name: '币安币',
    symbol: 'BNB',
    price: 312.45,
    change: 0.87,
    marketCap: '48.9B',
    volume: '2.1B',
    icon: 'BNB'
  }
]

// 新闻数据
const newsData = [
  {
    id: 1,
    title: '比特币突破43000美元关口，机构投资者持续增持',
    excerpt: '随着机构投资者的持续涌入，比特币价格再次突破重要心理关口，市场情绪乐观。',
    category: '市场分析',
    date: '2024-01-15',
    readTime: '3分钟'
  },
  {
    id: 2,
    title: '以太坊2.0升级进展顺利，质押量创历史新高',
    excerpt: '以太坊网络升级持续推进，质押量突破历史记录，网络安全性进一步提升。',
    category: '技术动态',
    date: '2024-01-14',
    readTime: '5分钟'
  },
  {
    id: 3,
    title: '全球监管政策更新：加密货币行业迎来新机遇',
    excerpt: '各国政府相继出台加密货币监管政策，为行业发展提供更清晰的框架。',
    category: '政策法规',
    date: '2024-01-13',
    readTime: '4分钟'
  }
]

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <NextSeo
        title="区块链资讯 - 比特币虚拟币专业平台"
        description="专业的区块链资讯平台，提供比特币、以太坊、虚拟币最新行情分析，区块链技术发展趋势，加密货币投资指南。实时价格、市场分析、技术动态，尽在区块链资讯。"
        canonical="https://your-domain.com"
        openGraph={{
          title: '区块链资讯 - 比特币虚拟币专业平台',
          description: '专业的区块链资讯平台，提供比特币、以太坊、虚拟币最新行情分析',
          url: 'https://your-domain.com',
          siteName: '区块链资讯',
          images: [
            {
              url: 'https://your-domain.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: '区块链资讯平台',
            },
          ],
          locale: 'zh_CN',
          type: 'website',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: '比特币,虚拟币,区块链,加密货币,以太坊,数字货币,比特币价格,虚拟币行情,区块链技术,加密货币投资,比特币新闻,虚拟币分析',
          },
        ]}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "区块链资讯 - 比特币虚拟币专业平台",
              "description": "专业的区块链资讯平台，提供比特币、以太坊、虚拟币最新行情分析",
              "url": "https://your-domain.com",
              "mainEntity": {
                "@type": "Organization",
                "name": "区块链资讯",
                "description": "专业的区块链资讯平台"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Bitcoin className="h-8 w-8 text-crypto-bitcoin" />
                <span className="ml-2 text-xl font-bold gradient-text">区块链资讯</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#market" className="text-gray-700 hover:text-primary-600 transition-colors">市场行情</a>
                <a href="#news" className="text-gray-700 hover:text-primary-600 transition-colors">新闻资讯</a>
                <a href="#analysis" className="text-gray-700 hover:text-primary-600 transition-colors">技术分析</a>
                <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">关于我们</a>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {currentTime.toLocaleString('zh-CN')}
                </span>
                <button className="btn-primary">登录</button>
              </div>
            </div>
          </div>
        </nav>

        {/* 英雄区域 */}
        <section className="relative overflow-hidden bg-gradient-to-r from-crypto-bitcoin to-crypto-ethereum text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              专业的<span className="text-crypto-gold">区块链资讯</span>平台
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              实时掌握比特币、以太坊、虚拟币最新行情，深度分析区块链技术发展趋势
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="btn-primary text-lg px-8 py-3">开始探索</button>
              <button className="btn-secondary text-lg px-8 py-3">了解更多</button>
            </motion.div>
          </div>
        </section>

        {/* 市场行情 */}
        <section id="market" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">实时市场行情</h2>
              <p className="text-gray-600 text-lg">掌握最新加密货币价格动态</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cryptoData.map((crypto, index) => (
                <motion.div
                  key={crypto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="crypto-card hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{crypto.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg">{crypto.name}</h3>
                        <p className="text-sm opacity-80">{crypto.symbol}</p>
                      </div>
                    </div>
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm opacity-80">价格</span>
                      <span className="font-bold text-xl">${crypto.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-80">24h变化</span>
                      <span className={`font-bold ${crypto.change >= 0 ? 'price-up' : 'price-down'}`}>
                        {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-80">市值</span>
                      <span className="font-bold">{crypto.marketCap}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 特色功能 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选择我们</h2>
              <p className="text-gray-600 text-lg">专业的区块链资讯服务</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">实时数据</h3>
                <p className="text-gray-600">提供最准确的加密货币价格和交易数据</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">安全可靠</h3>
                <p className="text-gray-600">数据来源可靠，信息安全保护</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">专业团队</h3>
                <p className="text-gray-600">资深分析师提供专业见解</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 新闻资讯 */}
        <section id="news" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">最新资讯</h2>
              <p className="text-gray-600 text-lg">区块链行业最新动态</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData.map((news, index) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="mb-4">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                      {news.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{news.date}</span>
                    <span>{news.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="btn-primary">查看更多资讯</button>
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Bitcoin className="h-8 w-8 text-crypto-bitcoin" />
                  <span className="ml-2 text-xl font-bold">区块链资讯</span>
                </div>
                <p className="text-gray-400">
                  专业的区块链资讯平台，为您提供最权威的加密货币市场分析。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">快速链接</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">市场行情</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">新闻资讯</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">技术分析</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">投资指南</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">热门币种</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">比特币 (BTC)</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">以太坊 (ETH)</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">币安币 (BNB)</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">更多币种</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">联系我们</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>邮箱: info@blockchain-news.com</li>
                  <li>电话: +86 400-123-4567</li>
                  <li>地址: 北京市朝阳区</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 区块链资讯. 保留所有权利.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
