import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next Shadcn Admin',
  description: 'Admin dashboard built with shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="group/body" suppressHydrationWarning>
        <div id="root"></div>
        {children}
      </body>
    </html>
  )
}
