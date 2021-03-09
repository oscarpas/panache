// eslint-disable-next-line
import { StyleObject } from 'panache-core/src/types'
import * as React from 'react'

export interface IPanacheMedia {
  contents: any
}

export interface IPanacheContext {
  theme?: StyleObject
  media?: IPanacheMedia
}

export const PanacheContext = React.createContext<IPanacheContext>({})

type ProviderProps = {
  theme: StyleObject,
  media: IPanacheMedia,
  children: React.ReactNode
}

export function PanacheProvider(props: ProviderProps) {
  const { theme, media, children } = props

  return React.createElement(
    PanacheContext.Provider,
    { value: { theme, media } },
    children,
  )
}
