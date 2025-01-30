import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>SwiftPanel</span>,
  project: {
    link: 'https://github.com/itzshubhamdev/swiftpanel',
  },
  docsRepositoryBase: 'https://github.com/itzshubhamdev/swiftpanel',
  footer: {
    text: `MIT ${new Date().getFullYear()} © ItzShubhamDev.`,
  },
}

export default config
