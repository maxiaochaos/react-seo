# 🕷️ 加密货币数据爬取指南

## 概述

本指南介绍如何为您的区块链资讯网站爬取和集成实时加密货币数据，以提升SEO效果和用户体验。

## 🎯 爬取目标

### 1. 中心化交易所（CEX）数据

#### 币安（Binance）
- **API文档**: https://www.binance.com/zh-CN/binance-api
- **数据内容**:
  - 实时价格
  - 24小时涨跌幅
  - 交易量
  - K线数据
  - 交易深度

#### OKX
- **API文档**: https://www.okx.com/zh-hans/docs/
- **数据内容**:
  - 市场数据
  - 交易数据
  - 账户数据

#### Bybit
- **API文档**: https://bybit-exchange.github.io/docs/zh-CN/bybit-api
- **数据内容**:
  - 实时行情
  - 历史数据
  - 交易深度

### 2. 行情聚合网站

#### CoinGecko
- **API文档**: https://www.coingecko.com/en/api
- **数据内容**:
  - 全球市场数据
  - 趋势币种
  - 价格数据
  - 市值排名

#### CoinMarketCap
- **API文档**: https://coinmarketcap.com/api/
- **数据内容**:
  - 市场数据
  - 价格数据
  - 历史数据

### 3. 区块链浏览器

#### Blockchain.com
- **API文档**: https://www.blockchain.com/api/docs
- **数据内容**:
  - 比特币交易数据
  - 地址余额
  - 区块信息

#### Etherscan
- **API文档**: https://docs.etherscan.io/
- **数据内容**:
  - 以太坊交易数据
  - 智能合约数据
  - 代币信息

## 🛠️ 技术实现

### 1. API集成

我们已经为您创建了完整的API集成方案：

```typescript
// utils/cryptoApi.ts
import { binanceApi, coingeckoApi, formatCryptoData } from '@/utils/cryptoApi'

// 获取主要币种数据
const cryptoData = await getMainCryptoData()

// 获取全球市场数据
const globalData = await coingeckoApi.getGlobalData()

// 获取趋势币种
const trendingData = await coingeckoApi.getTrending()
```

### 2. 数据缓存机制

```typescript
// 5分钟缓存，避免频繁请求
const CACHE_DURATION = 5 * 60 * 1000

export const withCache = async (key: string, fetcher: () => Promise<any>) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  const data = await fetcher()
  cache.set(key, { data, timestamp: Date.now() })
  return data
}
```

### 3. 错误处理和备用数据

```typescript
try {
  const data = await fetchCryptoData()
  setCryptoData(data)
} catch (error) {
  console.error('获取实时数据失败:', error)
  // 使用备用数据
  setCryptoData(fallbackData)
}
```

## 📊 数据展示页面

### 1. 实时市场行情页面
- **路径**: `/market`
- **功能**: 显示实时价格、涨跌幅、交易量
- **SEO优化**: 针对"比特币价格"、"以太坊价格"等关键词

### 2. API接口
- **路径**: `/api/crypto-data`
- **功能**: 提供JSON格式的加密货币数据
- **用途**: 前端页面数据获取

## 🔧 部署配置

### 1. 环境变量
```env
# 可选：API密钥（如果需要）
BINANCE_API_KEY=your_binance_api_key
COINGECKO_API_KEY=your_coingecko_api_key

# 网站配置
SITE_URL=https://chaosbtc.com
BAIDU_ANALYTICS_ID=your_baidu_analytics_id
```

### 2. 更新频率
- **实时数据**: 每5分钟更新一次
- **缓存时间**: 5分钟
- **自动刷新**: 前端每5分钟自动获取新数据

## 📈 SEO优化策略

### 1. 关键词优化
- **主要关键词**: 比特币价格、以太坊价格、加密货币行情
- **长尾关键词**: 比特币实时价格、以太坊今日价格、虚拟币行情
- **相关关键词**: 数字货币市场、加密货币投资、区块链技术

### 2. 内容策略
- **实时数据**: 提供最新的价格和涨跌幅
- **市场分析**: 结合数据提供市场趋势分析
- **新闻资讯**: 配合数据发布相关新闻

### 3. 技术SEO
- **结构化数据**: 使用JSON-LD标记价格数据
- **网站地图**: 包含数据页面
- **移动端优化**: 响应式设计

## ⚠️ 注意事项

### 1. 合规性
- 遵守各平台的API使用条款
- 合理设置请求频率
- 添加免责声明

### 2. 性能优化
- 使用缓存减少API请求
- 实现错误处理和备用数据
- 优化加载速度

### 3. 数据准确性
- 验证数据来源的可靠性
- 定期检查数据准确性
- 提供数据更新时间

## 🚀 扩展功能

### 1. 更多数据源
- 添加更多交易所API
- 集成DeFi数据
- 爬取社交媒体情绪

### 2. 高级功能
- 价格提醒
- 技术分析指标
- 投资组合跟踪

### 3. 用户交互
- 自定义关注列表
- 价格图表
- 历史数据查询

## 📞 技术支持

如果在实施过程中遇到问题：

1. **检查API文档**: 确保API调用格式正确
2. **查看错误日志**: 检查控制台错误信息
3. **测试API连接**: 使用Postman等工具测试API
4. **联系技术支持**: 如有需要，可以寻求专业帮助

---

**提示**: 建议先在测试环境中验证所有功能，确保数据获取和展示正常，然后再部署到生产环境。
