import React from 'react'

interface IPanacheContext {
  theme?: object
  media?: object
}

export const PanacheContext = React.createContext<IPanacheContext>({})

type ProviderProps = {
  theme: object,
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