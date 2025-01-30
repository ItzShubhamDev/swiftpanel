/// <reference path="../../../adonisrc.ts" />
/// <reference path="../../../config/inertia.ts"/>

import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import Layout from './layout.js'
import ThemeLayout from './themeLayout'

const appName = import.meta.env.VITE_APP_NAME || 'SwiftPanel'

createInertiaApp({
  progress: { color: '#34D399' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const currentPage = (await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )) as any
    if (!name.startsWith('auth/') && !name.startsWith('/')) {
      currentPage.default.layout =
        currentPage.default.layout ||
        ((page: React.ReactNode) => (
          <ThemeLayout>
            <Layout children={page} />
          </ThemeLayout>
        ))
    } else if (name.startsWith('auth/')) {
      currentPage.default.layout =
        currentPage.default.layout || ((page: React.ReactNode) => <ThemeLayout children={page} />)
    }
    return currentPage
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
