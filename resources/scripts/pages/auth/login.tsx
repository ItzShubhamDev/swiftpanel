import { Lock, LucideMail, LucideUserRound } from 'lucide-react'
import { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { toast } from 'react-toastify'

export default function Page() {
  const [values, setValues] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      router.post('/auth/login', values)
      toast.success('Logged in successfully')
    } catch (error) {
      toast.error('Failed to login')
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4">
        <div className="rounded-xl border bg-card text-card-foreground w-full max-w-md shadow-xl border-emerald-100">
          <div className="flex flex-col p-6 space-y-3">
            <div className="mx-auto bg-emerald-100 p-3 rounded-full">
              <LucideUserRound className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="font-semibold tracking-tight text-2xl text-center text-gray-800">
              Welcome Back
            </h3>
            <p className="text-sm text-center text-gray-600">
              Please sign in to continue to your account
            </p>
          </div>
          <form className="p-6 pt-0 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <LucideMail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  id="email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  id="password"
                  value={values.password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-9 px-4 py-2 text-emerald-600 hover:text-emerald-700">
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
