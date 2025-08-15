import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import '../styles/globals.css'

// SEO默认配置
const DEFAULT_SEO = {
  titleTemplate: '%s | 区块链资讯 - 比特币虚拟币专业平台',
  defaultTitle: '区块链资讯 - 比特币虚拟币专业平台',
  description: '专业的区块链资讯平台，提供比特币、以太坊、虚拟币最新行情分析，区块链技术发展趋势，加密货币投资指南。',
  canonical: 'https://your-domain.com',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com',
    siteName: '区块链资讯',
    title: '区块链资讯 - 比特币虚拟币专业平台',
    description: '专业的区块链资讯平台，提供比特币、以太坊、虚拟币最新行情分析，区块链技术发展趋势，加密货币投资指南。',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '区块链资讯平台',
      },
    ],
  },
  twitter: {
    handle: '@crypto_news',
    site: '@crypto_news',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: '比特币,虚拟币,区块链,加密货币,以太坊,数字货币,比特币价格,虚拟币行情,区块链技术,加密货币投资',
    },
    {
      name: 'author',
      content: '区块链资讯团队',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        
        {/* 百度统计 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_ANALYTICS_ID";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "区块链资讯",
              "description": "专业的区块链资讯平台，提供比特币、以太坊、虚拟币最新行情分析",
              "url": "https://your-domain.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://your-domain.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      
      <DefaultSeo {...DEFAULT_SEO} />
      
      <Component {...pageProps} />
    </>
  )
}
