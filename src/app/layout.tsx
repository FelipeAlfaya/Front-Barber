import './globals.css'
import localFont from 'next/font/local'

const poppins = localFont({
  src: './fonts/Poppins-SemiBold.ttf',
})

export const metadata = {
  title: 'Smart Barber',
  description: 'Agendamentos de barbearia online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-br' className={poppins.className}>
      <body>{children}</body>
    </html>
  )
}
