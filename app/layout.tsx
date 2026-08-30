import type { Metadata } from 'next'
import '@/app/globals.css'
import { TransitionProvider } from '@/components/TransitionContext'

export const metadata: Metadata = {
  title: 'Kayky Bazzan • Desenvolvedor de Software',
  description: 'Portfolio de Kayky Bazzan, desenvolvedor de software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#1C1D20] text-white">
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  )
}