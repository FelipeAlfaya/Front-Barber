import '../styles/globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: 'normal',
  preload: true,
});

export const metadata = {
  title: 'Smart Barber',
  description: 'Agendamentos de barbearia online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" style={poppins.style}>
      <body>{children}</body>
    </html>
  );
}
