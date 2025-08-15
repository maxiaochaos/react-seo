// 加密货币数据API工具函数

// 币安API基础URL
const BINANCE_API_BASE = 'https://api.binance.com/api/v3'
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

// 币安API接口
export const binanceApi = {
  // 获取24小时价格统计
  get24hrTicker: async (symbol: string = 'BTCUSDT') => {
    try {
      const response = await fetch(`${BINANCE_API_BASE}/ticker/24hr?symbol=${symbol}`)
      return await response.json()
    } catch (error) {
      console.error('获取币安数据失败:', error)
      return null
    }
  },

  // 获取K线数据
  getKlines: async (symbol: string = 'BTCUSDT', interval: string = '1d', limit: number = 30) => {
    try {
      const response = await fetch(
        `${BINANCE_API_BASE}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      )
      return await response.json()
    } catch (error) {
      console.error('获取K线数据失败:', error)
      return null
    }
  },

  // 获取交易深度
  getDepth: async (symbol: string = 'BTCUSDT', limit: number = 10) => {
    try {
      const response = await fetch(
        `${BINANCE_API_BASE}/depth?symbol=${symbol}&limit=${limit}`
      )
      return await response.json()
    } catch (error) {
      console.error('获取交易深度失败:', error)
      return null
    }
  }
}

// CoinGecko API接口
export const coingeckoApi = {
  // 获取市场数据
  getMarketData: async (ids: string = 'bitcoin,ethereum,binancecoin', currency: string = 'usd') => {
    try {
      const response = await fetch(
        `${COINGECKO_API_BASE}/simple/price?ids=${ids}&vs_currencies=${currency}&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
      )
      return await response.json()
    } catch (error) {
      console.error('获取CoinGecko数据失败:', error)
      return null
    }
  },

  // 获取趋势币种
  getTrending: async () => {
    try {
      const response = await fetch(`${COINGECKO_API_BASE}/search/trending`)
      return await response.json()
    } catch (error) {
      console.error('获取趋势数据失败:', error)
      return null
    }
  },

  // 获取全球市场数据
  getGlobalData: async () => {
    try {
      const response = await fetch(`${COINGECKO_API_BASE}/global`)
      return await response.json()
    } catch (error) {
      console.error('获取全球数据失败:', error)
      return null
    }
  }
}

// 数据格式化函数
export const formatCryptoData = {
  // 格式化价格
  formatPrice: (price: number, decimals: number = 2) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(price)
  },

  // 格式化市值
  formatMarketCap: (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(2)}M`
    } else {
      return marketCap.toLocaleString()
    }
  },

  // 格式化涨跌幅
  formatChange: (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  },

  // 格式化交易量
  formatVolume: (volume: number) => {
    if (volume >= 1e9) {
      return `${(volume / 1e9).toFixed(2)}B`
    } else if (volume >= 1e6) {
      return `${(volume / 1e6).toFixed(2)}M`
    } else {
      return volume.toLocaleString()
    }
  }
}

// 缓存机制
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

export const withCache = async (key: string, fetcher: () => Promise<any>) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  const data = await fetcher()
  cache.set(key, {
    data,
    timestamp: Date.now()
  })

  return data
}

// 主要币种数据
export const getMainCryptoData = async () => {
  const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT']
  const results = await Promise.all(
    symbols.map(symbol => 
      withCache(`binance_${symbol}`, () => binanceApi.get24hrTicker(symbol))
    )
  )

  return results.filter(Boolean).map((data, index) => ({
    symbol: symbols[index],
    name: getCryptoName(symbols[index]),
    price: parseFloat(data.lastPrice),
    change: parseFloat(data.priceChangePercent),
    volume: parseFloat(data.volume),
    marketCap: parseFloat(data.quoteVolume),
    high24h: parseFloat(data.highPrice),
    low24h: parseFloat(data.lowPrice)
  }))
}

// 获取币种名称
const getCryptoName = (symbol: string) => {
  const names: { [key: string]: string } = {
    'BTCUSDT': '比特币',
    'ETHUSDT': '以太坊',
    'BNBUSDT': '币安币',
    'ADAUSDT': '卡尔达诺',
    'SOLUSDT': '索拉纳'
  }
  return names[symbol] || symbol
}
