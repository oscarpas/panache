export const media = {
  dark: '@media (prefers-color-scheme: dark)',
  small: '@media (max-width: 768px)',
}

export const theme = {
  colors: {
    primary: ['#111', [media.dark, '#f7fafc']],
    background: ['#fff', [media.dark, '#151515']],
    grayDark: ['#2d3748', [media.dark, '#e2e8f0']],
    grayMedium: '#718095',
    grayLight: ['#edf2f7', [media.dark, '#2d3748']],
  },
  borderRadius: '0.5rem',
  borders: {
    faint: ['1px solid #edf2f7', [media.dark, '1px solid #1a202c']],
    strong: ['2px solid #111', [media.dark, '1px solid #f7fafc']],
  },
  fonts: {
    primary: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    code: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace'
  }
}