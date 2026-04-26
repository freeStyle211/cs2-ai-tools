import './globals.css'

export const metadata = {
  title: 'CS2 外设推荐助手',
  description: '根据你的需求推荐最适合的 CS2 游戏外设',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
