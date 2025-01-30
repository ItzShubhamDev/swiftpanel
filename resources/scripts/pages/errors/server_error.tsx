import { Link } from 'lucide-react'

export default function ServerError(props: { error: any }) {
  return (
    <div className="grid h-screen place-content-center bg-white dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-600 dark:text-gray-200">500</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Server Error
        </p>

        <p className="mt-4 text-gray-600 dark:text-gray-200">{props.error.message}</p>

        <Link
          href="/"
          className="mt-6 inline-block rounded bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
