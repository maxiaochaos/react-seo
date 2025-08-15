import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Tag, Share2, ArrowLeft } from 'lucide-react'

// 新闻数据
const newsData = {
  'bitcoin-breaks-43000': {
    title: '比特币突破43000美元关口，机构投资者持续增持',
    excerpt: '随着机构投资者的持续涌入，比特币价格再次突破重要心理关口，市场情绪乐观。',
    content: `
      <p>比特币价格在今日交易中成功突破43000美元关口，这是自去年12月以来的重要突破。市场分析师认为，这一突破主要得益于机构投资者的持续增持。</p>
      
      <h2>机构投资者推动价格上涨</h2>
      <p>根据最新数据显示，机构投资者对比特币的兴趣持续增长。多家大型投资机构，包括灰度投资、MicroStrategy等公司都在积极增持比特币。</p>
      
      <p>MicroStrategy公司首席执行官Michael Saylor表示："我们相信比特币是数字时代的黄金，将继续作为我们主要的储备资产。"</p>
      
      <h2>市场情绪分析</h2>
      <p>技术分析师指出，比特币目前处于关键支撑位之上，如果能够稳定在43000美元以上，可能会进一步测试45000美元阻力位。</p>
      
      <p>然而，也有分析师提醒投资者注意风险，建议在投资前进行充分的研究和风险评估。</p>
      
      <h2>监管环境变化</h2>
      <p>近期，全球多个国家的监管机构对加密货币的态度有所缓和，这也为比特币价格的上涨提供了支撑。</p>
      
      <p>美国证券交易委员会（SEC）正在考虑批准比特币ETF，这可能会为机构投资者提供更便捷的投资渠道。</p>
    `,
    category: '市场分析',
    author: '区块链分析师',
    date: '2024-01-15',
    readTime: '5分钟',
    tags: ['比特币', '价格分析', '机构投资', '市场趋势'],
    image: '/images/bitcoin-price.jpg'
  },
  'ethereum-2-upgrade': {
    title: '以太坊2.0升级进展顺利，质押量创历史新高',
    excerpt: '以太坊网络升级持续推进，质押量突破历史记录，网络安全性进一步提升。',
    content: `
      <p>以太坊2.0升级项目取得了重要进展，质押量已经突破历史新高，这标志着以太坊向权益证明（PoS）机制的转型正在稳步推进。</p>
      
      <h2>质押量创新高</h2>
      <p>根据以太坊基金会的最新数据，目前以太坊2.0的质押量已经超过1000万枚ETH，价值超过260亿美元。这一数字创下了历史新高。</p>
      
      <p>以太坊联合创始人Vitalik Buterin表示："质押量的增长表明社区对以太坊2.0的信心正在增强。"</p>
      
      <h2>网络安全性提升</h2>
      <p>随着质押量的增加，以太坊网络的安全性也得到了显著提升。更多的验证者参与网络验证，使得网络更加去中心化和安全。</p>
      
      <p>技术专家指出，以太坊2.0的升级将显著降低网络的能源消耗，同时提高交易处理能力。</p>
      
      <h2>未来展望</h2>
      <p>以太坊2.0的完整升级预计将在未来几个月内完成。一旦完成，以太坊将实现从工作量证明到权益证明的完全转型。</p>
      
      <p>这一升级将为以太坊生态系统带来更多可能性，包括更高的可扩展性和更低的交易费用。</p>
    `,
    category: '技术动态',
    author: '技术分析师',
    date: '2024-01-14',
    readTime: '4分钟',
    tags: ['以太坊', '以太坊2.0', '质押', '技术升级'],
    image: '/images/ethereum-upgrade.jpg'
  }
}

interface NewsPageProps {
  news: any
}

export default function NewsPage({ news }: NewsPageProps) {
  if (!news) {
    return <div>新闻不存在</div>
  }

  return (
    <>
      <NextSeo
        title={`${news.title} - 区块链资讯`}
        description={news.excerpt}
        canonical={`https://your-domain.com/news/${news.slug}`}
        openGraph={{
          title: news.title,
          description: news.excerpt,
          url: `https://your-domain.com/news/${news.slug}`,
          type: 'article',
          article: {
            publishedTime: news.date,
            modifiedTime: news.date,
            authors: [news.author],
            tags: news.tags,
          },
          images: [
            {
              url: news.image,
              width: 1200,
              height: 630,
              alt: news.title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `${news.tags.join(',')},区块链,加密货币,虚拟币,比特币,以太坊`,
          },
          {
            name: 'author',
            content: news.author,
          },
          {
            property: 'article:published_time',
            content: news.date,
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
                <a href="/news" className="text-gray-700 hover:text-primary-600">新闻</a>
              </div>
            </div>
          </div>
        </nav>

        {/* 主要内容 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* 文章头部 */}
            <div className="p-8">
              <div className="mb-6">
                <a href="/news" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回新闻列表
                </a>
                
                <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {news.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {news.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6">
                  {news.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{news.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 文章内容 */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
              
              {/* 分享按钮 */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">分享这篇文章：</span>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <Share2 className="h-4 w-4 mr-2" />
                      分享
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(newsData).map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const news = newsData[slug as keyof typeof newsData]

  if (!news) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      news: { ...news, slug },
    },
    revalidate: 3600, // 每小时重新生成
  }
}
