import React from 'react'
import { Sheet } from '@panache/core'

export const sheet = new Sheet()

export function getServerSheet() {
  const sheetStyles = sheet.get()

  return Object
    .entries(sheetStyles)
    .map(([panacheId, css]) =>
      React.createElement('style', { 'panache-id': panacheId, key: panacheId }, css))
}