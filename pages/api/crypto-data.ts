import type { NextApiRequest, NextApiResponse } from 'next'
import { getMainCryptoData, coingeckoApi } from '@/utils/cryptoApi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 获取主要币种数据
    const cryptoData = await getMainCryptoData()
    
    // 获取全球市场数据
    const globalData = await coingeckoApi.getGlobalData()
    
    // 获取趋势币种
    const trendingData = await coingeckoApi.getTrending()

    res.status(200).json({
      success: true,
      data: {
        crypto: cryptoData,
        global: globalData?.data,
        trending: trendingData?.coins?.slice(0, 10) || [],
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
