import { Navbar } from '~/components/Navbar'
import { Sidebar } from '~/components/server/Sidebar'
import { Head, usePage } from '@inertiajs/react'
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { route } = usePage().props as unknown as { route: string }
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      <div className="flex h-screen bg-gray-50">
        {route.startsWith('server') && <Sidebar />}
        <div className="h-full flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="h-full flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </>
  )
}
