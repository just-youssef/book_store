import 'styles/globals.css'

import checkUser from '@utils/checkUser';
import { NavbarExtended } from '@components';

export const metadata = {
  title: 'Book Store',
  description: 'Helps you to find your book!',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  checkUser();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50 font-manrope">
        <NavbarExtended />
        <main className='max-sm:px-5 px-10 py-5'>
          {children}
        </main>
      </body>
    </html>
  )
}
