import { NextSeo } from 'next-seo'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, Globe, RefreshCw, Bitcoin } from 'lucide-react'
import { getMainCryptoData, formatCryptoData, coingeckoApi } from '@/utils/cryptoApi'

interface CryptoData {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  marketCap: number
  high24h: number
  low24h: number
}

interface GlobalData {
  active_cryptocurrencies: number
  total_market_cap: { usd: number }
  total_volume: { usd: number }
  market_cap_percentage: { btc: number }
}

export default function MarketPage() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [globalData, setGlobalData] = useState<GlobalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/crypto-data')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      
      if (result.success) {
        setCryptoData(result.data.crypto || [])
        setGlobalData(result.data.global)
        setLastUpdate(new Date())
      } else {
        console.error('API返回失败:', result.message)
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 延迟获取数据，确保页面完全加载
    const timer = setTimeout(fetchData, 1000)
    
    // 每5分钟自动更新数据
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // 只在客户端设置时间，避免水合错误
    setLastUpdate(new Date())
  }, [])

  return (
    <>
      <NextSeo
        title="实时市场行情 - 区块链资讯"
        description="获取比特币、以太坊等主流加密货币的实时价格、涨跌幅、交易量等市场数据。专业的加密货币行情分析平台。"
        canonical="https://chaosbtc.com/market"
        openGraph={{
          title: '实时市场行情 - 区块链资讯',
          description: '获取比特币、以太坊等主流加密货币的实时价格、涨跌幅、交易量等市场数据',
          url: 'https://chaosbtc.com/market',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: '比特币价格,以太坊价格,加密货币行情,虚拟币价格,数字货币市场,比特币实时价格,以太坊实时价格',
          },
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Bitcoin className="h-8 w-8 text-crypto-bitcoin" />
                <span className="ml-2 text-xl font-bold gradient-text">区块链资讯</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-700 hover:text-primary-600">首页</a>
                <a href="/market" className="text-primary-600 font-medium">市场行情</a>
                <a href="/news" className="text-gray-700 hover:text-primary-600">新闻资讯</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">实时市场行情</h1>
            <p className="text-gray-600 text-lg">掌握最新加密货币价格动态</p>
            
            {/* 更新时间 */}
            <div className="flex items-center justify-center mt-4 space-x-2">
              <span className="text-sm text-gray-500">
                最后更新: {lastUpdate ? lastUpdate.toLocaleString('zh-CN') : '加载中...'}
              </span>
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                刷新
              </button>
            </div>
          </div>

          {/* 全球市场概览 */}
          {globalData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary-600" />
                全球市场概览
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {globalData.active_cryptocurrencies.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">活跃币种</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${formatCryptoData.formatMarketCap(globalData.total_market_cap.usd)}
                  </div>
                  <div className="text-sm text-gray-600">总市值</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${formatCryptoData.formatMarketCap(globalData.total_volume.usd)}
                  </div>
                  <div className="text-sm text-gray-600">24h交易量</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-crypto-bitcoin">
                    {globalData.market_cap_percentage.btc.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">比特币占比</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 主要币种行情 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                主要币种行情
              </h2>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">正在加载数据...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        币种
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        价格
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        24h涨跌
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        24h最高
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        24h最低
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        24h成交量
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cryptoData.map((crypto, index) => (
                      <motion.tr
                        key={crypto.symbol}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-crypto-bitcoin rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {crypto.symbol.slice(0, 3)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {crypto.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {crypto.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${formatCryptoData.formatPrice(crypto.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className={`flex items-center justify-end ${
                            crypto.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {crypto.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-sm font-medium">
                              {formatCryptoData.formatChange(crypto.change)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            ${formatCryptoData.formatPrice(crypto.high24h)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            ${formatCryptoData.formatPrice(crypto.low24h)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {formatCryptoData.formatVolume(crypto.volume)}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 免责声明 */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  免责声明
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    本网站提供的加密货币价格数据仅供参考，不构成投资建议。加密货币投资存在风险，请谨慎投资。
                    数据来源于公开API，可能存在延迟，请以实际交易平台数据为准。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
