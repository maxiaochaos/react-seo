# 🚀 部署指南 - 区块链资讯网站

## 快速部署到Vercel

### 方法一：一键部署（推荐）

1. **点击下面的按钮直接部署到Vercel**

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/react-seo)

2. **配置环境变量**
   - 在Vercel项目设置中添加以下环境变量：
     - `SITE_URL`: 您的网站域名（如：https://your-domain.com）
     - `BAIDU_ANALYTICS_ID`: 您的百度统计ID

3. **部署完成**
   - Vercel会自动构建和部署您的网站
   - 您会得到一个类似 `https://your-project.vercel.app` 的域名

### 方法二：GitHub + Vercel集成

1. **上传到GitHub**
   ```bash
   # 初始化Git仓库
   git init
   git add .
   git commit -m "Initial commit: 区块链资讯网站"
   
   # 创建GitHub仓库并推送
   git remote add origin https://github.com/your-username/react-seo.git
   git branch -M main
   git push -u origin main
   ```

2. **连接Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub账号登录
   - 点击 "New Project"
   - 选择您的GitHub仓库
   - 配置环境变量
   - 点击 "Deploy"

3. **自动部署**
   - 每次推送到GitHub的main分支都会自动触发部署
   - Vercel会自动构建和部署最新版本

## 环境变量配置

### 必需的环境变量

在Vercel项目设置中添加以下环境变量：

| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `SITE_URL` | 您的网站域名 | `https://your-domain.com` |
| `BAIDU_ANALYTICS_ID` | 百度统计ID | `your_baidu_analytics_id` |

### 可选的环境变量

| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `GOOGLE_ANALYTICS_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `TWITTER_HANDLE` | Twitter用户名 | `@crypto_news` |

## 自定义域名

1. **在Vercel中添加自定义域名**
   - 进入项目设置
   - 点击 "Domains"
   - 添加您的域名（如：your-domain.com）

2. **配置DNS**
   - 在您的域名提供商处添加DNS记录
   - 类型：CNAME
   - 名称：@ 或 www
   - 值：cname.vercel-dns.com

3. **更新环境变量**
   - 将 `SITE_URL` 更新为您的自定义域名

## SEO优化检查清单

部署完成后，请检查以下项目：

### 1. 基础SEO
- [ ] 网站可以正常访问
- [ ] 所有页面都有正确的title和description
- [ ] 图片都有alt属性
- [ ] 网站地图可以访问：`your-domain.com/sitemap.xml`
- [ ] Robots.txt可以访问：`your-domain.com/robots.txt`

### 2. 性能优化
- [ ] 使用Google PageSpeed Insights测试性能
- [ ] 移动端友好性测试
- [ ] 核心Web指标检查

### 3. 搜索引擎提交
- [ ] 提交网站到百度站长工具
- [ ] 提交网站到Google Search Console
- [ ] 提交网站地图到各大搜索引擎

### 4. 百度SEO优化
- [ ] 确保网站使用HTTPS
- [ ] 添加百度统计代码
- [ ] 配置百度站长工具
- [ ] 提交网站地图到百度

## 常见问题

### Q: 部署后网站无法访问？
A: 检查环境变量是否正确配置，特别是 `SITE_URL`

### Q: 百度统计不工作？
A: 确保 `BAIDU_ANALYTICS_ID` 环境变量已正确设置

### Q: 网站地图生成失败？
A: 确保 `SITE_URL` 环境变量已设置，并且域名可以访问

### Q: 如何更新网站内容？
A: 修改代码后推送到GitHub，Vercel会自动重新部署

## 监控和维护

### 1. 性能监控
- 使用Vercel Analytics监控网站性能
- 定期检查Google PageSpeed Insights
- 监控核心Web指标

### 2. SEO监控
- 使用百度站长工具监控索引情况
- 监控关键词排名
- 检查网站地图更新

### 3. 内容更新
- 定期更新新闻和分析内容
- 保持内容的时效性和准确性
- 根据市场变化调整关键词策略

## 技术支持

如果遇到部署问题，可以：

1. 检查Vercel部署日志
2. 查看GitHub Actions运行状态
3. 参考Vercel官方文档
4. 提交Issue到GitHub仓库

---

**提示**：部署完成后，建议先在测试环境中验证所有功能，然后再进行SEO优化和推广。
