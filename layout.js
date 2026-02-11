
import './globals.css';
import { MeshProvider } from '@meshsdk/react';

export const metadata = {
  title: 'Phoenix Vault | Cardano Savings',
  description: 'Set goals and save ADA securely on-chain.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Uncut+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Uncut Sans', sans-serif" }}>
        <MeshProvider>
          {children}
        </MeshProvider>
      </body>
    </html>
  );
}