import type { NextApiRequest, NextApiResponse } from 'next'

// 简化的API处理函数
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 直接在这里获取数据，避免复杂的依赖
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT']
    
    // 获取币安数据
    const cryptoPromises = symbols.map(async (symbol) => {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
        if (!response.ok) return null
        const data = await response.json()
        
        return {
          symbol: symbol,
          name: getCryptoName(symbol),
          price: parseFloat(data.lastPrice),
          change: parseFloat(data.priceChangePercent),
          volume: parseFloat(data.volume),
          marketCap: parseFloat(data.quoteVolume),
          high24h: parseFloat(data.highPrice),
          low24h: parseFloat(data.lowPrice)
        }
      } catch (error) {
        console.error(`获取${symbol}数据失败:`, error)
        return null
      }
    })

    const cryptoData = (await Promise.all(cryptoPromises)).filter(Boolean)

    // 获取全球市场数据
    let globalData = null
    try {
      const globalResponse = await fetch('https://api.coingecko.com/api/v3/global')
      if (globalResponse.ok) {
        const globalResult = await globalResponse.json()
        globalData = globalResult.data
      }
    } catch (error) {
      console.error('获取全球数据失败:', error)
    }

    res.status(200).json({
      success: true,
      data: {
        crypto: cryptoData,
        global: globalData,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('API错误:', error)
    res.status(500).json({
      success: false,
      message: '获取数据失败',
      error: error instanceof Error ? error.message : '未知错误'
    })
  }
}

// 获取币种名称
function getCryptoName(symbol: string) {
  const names: { [key: string]: string } = {
    'BTCUSDT': '比特币',
    'ETHUSDT': '以太坊',
    'BNBUSDT': '币安币',
    'ADAUSDT': '卡尔达诺',
    'SOLUSDT': '索拉纳'
  }
  return names[symbol] || symbol
}
