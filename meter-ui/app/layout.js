import './globals.css';

import Nav from './nav';
import { Suspense } from 'react';

export const metadata = {
  title: 'openvolt Dashboard',
  description:
    'Another openvolt dashboard.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
