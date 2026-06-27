import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { LangProvider } from '@/components/lang-context'
import { TopNav } from '@/components/top-nav'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'design.md — website design system directory',
  description: 'A directory of website design systems, extracted as design.md.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground">
        <LangProvider>
          <TopNav />
          <div className="min-h-[calc(100vh-56px)]">{children}</div>
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}
