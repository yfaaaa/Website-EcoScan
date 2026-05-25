import './globals.css'
import { EcoProvider } from '@/context/ecocontext'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white`}>
        <EcoProvider>
          {children}
        </EcoProvider>
      </body>
    </html>
  )
}