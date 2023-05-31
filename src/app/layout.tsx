import './globals.css';
import { Poppins } from 'next/font/google/index';

const poppins = Poppins({
  display: 'swap',
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
    <html lang="pt-br" style={poppins.style}>
      <body>{children}</body>
    </html>
  );
}
