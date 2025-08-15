import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, Users } from 'lucide-react'

// 加密货币数据
const cryptoData = {
  bitcoin: {
    name: '比特币',
    symbol: 'BTC',
    price: 43250.67,
    change: 2.34,
    marketCap: '847.2B',
    volume: '28.5B',
    description: '比特币（Bitcoin）是世界上第一个去中心化的加密货币，由中本聪在2009年创建。它基于区块链技术，具有去中心化、不可篡改、全球流通等特点。',
    features: [
      '去中心化网络',
      '有限供应（2100万枚）',
      '全球支付系统',
      '数字黄金属性'
    ],
    history: '比特币于2009年1月3日诞生，经历了多次价格波动，从最初的几美分涨到现在的数万美元。',
    icon: '₿',
    color: '#F7931A'
  },
  ethereum: {
    name: '以太坊',
    symbol: 'ETH',
    price: 2650.89,
    change: -1.23,
    marketCap: '318.7B',
    volume: '15.2B',
    description: '以太坊（Ethereum）是一个开源的区块链平台，支持智能合约和去中心化应用（DApps）的开发。',
    features: [
      '智能合约平台',
      '去中心化应用',
      '以太坊2.0升级',
      '权益证明机制'
    ],
    history: '以太坊由Vitalik Buterin在2015年创建，目前正在进行向权益证明机制的升级。',
    icon: 'Ξ',
    color: '#627EEA'
  },
  'binance-coin': {
    name: '币安币',
    symbol: 'BNB',
    price: 312.45,
    change: 0.87,
    marketCap: '48.9B',
    volume: '2.1B',
    description: '币安币（BNB）是币安交易所的原生代币，用于支付交易费用、参与代币销售等。',
    features: [
      '交易所代币',
      '费用折扣',
      '代币销售参与',
      '生态系统建设'
    ],
    history: 'BNB于2017年由币安交易所发行，随着币安生态系统的扩展而增值。',
    icon: 'BNB',
    color: '#F3BA2F'
  }
}

interface CryptoPageProps {
  crypto: any
}

export default function CryptoPage({ crypto }: CryptoPageProps) {
  if (!crypto) {
    return <div>币种不存在</div>
  }

  return (
    <>
      <NextSeo
        title={`${crypto.name} (${crypto.symbol}) 价格行情 - 区块链资讯`}
        description={`获取${crypto.name}最新价格、市场数据、技术分析。${crypto.description}`}
        canonical={`https://your-domain.com/crypto/${crypto.symbol.toLowerCase()}`}
        openGraph={{
          title: `${crypto.name} (${crypto.symbol}) 价格行情`,
          description: `${crypto.name}最新价格、市场数据、技术分析`,
          url: `https://your-domain.com/crypto/${crypto.symbol.toLowerCase()}`,
          images: [
            {
              url: `https://your-domain.com/images/${crypto.symbol.toLowerCase()}.jpg`,
              width: 1200,
              height: 630,
              alt: `${crypto.name}价格图表`,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `${crypto.name},${crypto.symbol},虚拟币,加密货币,比特币,以太坊,数字货币,${crypto.name}价格,${crypto.name}行情`,
          },
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold">区块链资讯</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-700 hover:text-primary-600">首页</a>
                <a href="/crypto" className="text-gray-700 hover:text-primary-600">币种</a>
              </div>
            </div>
          </div>
        </nav>

        {/* 主要内容 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* 头部信息 */}
            <div className="flex items-center mb-8">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6"
                style={{ backgroundColor: crypto.color }}
              >
                {crypto.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{crypto.name} ({crypto.symbol})</h1>
                <p className="text-gray-600">{crypto.description}</p>
              </div>
            </div>

            {/* 价格信息 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">当前价格</span>
                </div>
                <div className="text-2xl font-bold">${crypto.price.toLocaleString()}</div>
                <div className={`flex items-center mt-2 ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{crypto.change >= 0 ? '+' : ''}{crypto.change}%</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">市值</span>
                </div>
                <div className="text-2xl font-bold">{crypto.marketCap}</div>
                <div className="text-sm text-gray-500 mt-2">总市值</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">24h交易量</span>
                </div>
                <div className="text-2xl font-bold">{crypto.volume}</div>
                <div className="text-sm text-gray-500 mt-2">24小时交易量</div>
              </div>
            </div>

            {/* 详细信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 特点 */}
              <div>
                <h2 className="text-xl font-bold mb-4">主要特点</h2>
                <ul className="space-y-3">
                  {crypto.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 历史 */}
              <div>
                <h2 className="text-xl font-bold mb-4">发展历史</h2>
                <p className="text-gray-700 leading-relaxed">{crypto.history}</p>
              </div>
            </div>

            {/* 相关链接 */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold mb-4">相关资源</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold mb-2">技术分析</h3>
                  <p className="text-sm text-gray-600">查看详细的技术分析报告</p>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold mb-2">新闻资讯</h3>
                  <p className="text-sm text-gray-600">获取最新相关新闻</p>
                </a>
                <a href="#" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold mb-2">投资指南</h3>
                  <p className="text-sm text-gray-600">了解投资策略和风险</p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(cryptoData).map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const crypto = cryptoData[slug as keyof typeof cryptoData]

  if (!crypto) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      crypto,
    },
    revalidate: 60, // 每分钟重新生成
  }
}
