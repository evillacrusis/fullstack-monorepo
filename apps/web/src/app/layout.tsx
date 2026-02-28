import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BarberConnect',
  description: 'Book your next barber appointment instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
