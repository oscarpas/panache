import React from 'react'
import { Sheet } from '@panache/core'

export const sheet = new Sheet()

export function getServerSheet() {
  const sheetStyles = sheet.get()

  return Object
    .entries(sheetStyles)
    .map(([cssClass, cssRules]) =>
      React.createElement('style', { className: cssClass, key: cssClass }, cssRules))
}