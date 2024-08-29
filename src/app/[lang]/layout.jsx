import ReduxProvider from '@/lib/redux/redux-provider'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import '@/styles/globals.scss'
import { getCommonDict } from '@/utils/i18n/get-dictionary'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({ children, params: { lang } }) {
  const t = await getCommonDict(lang)
  return (
    <html lang='en'>
      <ReduxProvider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <body className={poppins.className}>
            <Toaster position='top-center' />
            <main>{children}</main>
            <div id='modal-container' />
          </body>
        </ThemeProvider>
      </ReduxProvider>
    </html>
  )
}
