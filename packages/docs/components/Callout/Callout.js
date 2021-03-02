import { execOnce } from "next/dist/next-server/lib/utils"

import panache from '@panache/react'

export const Callout = panache.div(({ theme }) => ({
  marginTop: '1.5rem',
  backgroundColor: '#fffaf0',
  borderRadius: theme.borderRadius,
  padding: '10px 20px',
}))