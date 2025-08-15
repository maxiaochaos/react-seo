import { NextSeo } from 'next-seo'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Search, Filter, Star, Bitcoin } from 'lucide-react'

interface CryptoRanking {
  rank: number
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  isFavorite: boolean
}

export default function RankingPage() {
  const [cryptoData, setCryptoData] = useState<CryptoRanking[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('marketCap')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currency, setCurrency] = useState('CNY')

  useEffect(() => {
    fetchRankingData()
  }, [])

  const fetchRankingData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/crypto-data')
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data.crypto) {
          const rankingData = result.data.crypto.map((crypto: any, index: number) => ({
            rank: index + 1,
            symbol: crypto.symbol,
            name: crypto.name,
            price: crypto.price,
            change24h: crypto.change,
            marketCap: crypto.marketCap,
            volume24h: crypto.volume,
            circulatingSupply: crypto.volume * 0.1, // 模拟数据
            isFavorite: false
          }))
          setCryptoData(rankingData)
        }
      }
    } catch (error) {
      console.error('获取排行榜数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(decimals)}T`
    if (num >= 1e9) return `${(num / 1e9).toFixed(decimals)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(decimals)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(decimals)}K`
    return num.toFixed(decimals)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: currency === 'CNY' ? 'CNY' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price * (currency === 'CNY' ? 7.2 : 1))
  }

  const filteredData = cryptoData
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy as keyof CryptoRanking] as number
      let bValue = b[sortBy as keyof CryptoRanking] as number
      
      if (sortOrder === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })

  return (
    <>
      <NextSeo
        title="币种排行榜 - 区块链资讯"
        description="实时币种排行榜，按市值、涨幅、成交额排序。查看比特币、以太坊等主流加密货币排名。"
        canonical="https://chaosbtc.com/ranking"
        openGraph={{
          title: '币种排行榜 - 区块链资讯',
          description: '实时币种排行榜，按市值、涨幅、成交额排序',
          url: 'https://chaosbtc.com/ranking',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: '币种排行榜,加密货币排名,比特币排名,以太坊排名,数字货币排行榜,虚拟币排名',
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
                <a href="/market" className="text-gray-700 hover:text-primary-600">市场行情</a>
                <a href="/ranking" className="text-primary-600 font-medium">排行榜</a>
                <a href="/news" className="text-gray-700 hover:text-primary-600">新闻资讯</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">币种排行榜</h1>
            <p className="text-gray-600 text-lg">实时加密货币排名，掌握市场动态</p>
          </div>

          {/* 搜索和筛选 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索币种名称或代码..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* 排序选择 */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="marketCap">市值</option>
                  <option value="change24h">24h涨幅</option>
                  <option value="volume24h">24h成交额</option>
                  <option value="price">价格</option>
                </select>

                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="CNY">人民币</option>
                  <option value="USD">美元</option>
                </select>
              </div>
            </div>
          </div>

          {/* 排行榜表格 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      排名
                    </th>
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
                      市值
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      24h成交额
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      流通量
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                            <div>
                              <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                              <div className="h-3 bg-gray-200 rounded w-12"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    filteredData.map((crypto, index) => (
                      <motion.tr
                        key={crypto.symbol}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            #{crypto.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-crypto-bitcoin rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                              {crypto.symbol.slice(0, 3)}
                            </div>
                            <div>
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
                            {formatPrice(crypto.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className={`flex items-center justify-end ${
                            crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {crypto.change24h >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span className="text-sm font-medium">
                              {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {formatNumber(crypto.marketCap)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {formatNumber(crypto.volume24h)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            {formatNumber(crypto.circulatingSupply)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            className={`p-1 rounded-full hover:bg-gray-100 ${
                              crypto.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                          >
                            <Star className="h-4 w-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
                  风险提示
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    本排行榜数据仅供参考，不构成投资建议。加密货币投资存在风险，请谨慎投资。
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
