import { StyleObject } from '@panache/core/src/types'
import React from 'react'

interface IPanacheContext {
  theme?: StyleObject
  media?: object
}

export const PanacheContext = React.createContext<IPanacheContext>({})

type ProviderProps = {
  theme: StyleObject,
  media: object,
  children: React.ReactNode
}

export function PanacheProvider(props: ProviderProps) {
  const { theme, media, children } = props

  return React.createElement(
    PanacheContext.Provider,
    { value: { theme, media }},
    children
  )
} 