import { Head } from '@inertiajs/react'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'next-themes'

export default function ThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      <ThemeProvider attribute="class" enableSystem>
        {children}
      </ThemeProvider>
    </>
  )
}
