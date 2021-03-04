const index = [
  { 
    label: 'Panache', 
    path: '/'
  },
  { 
    label: 'React Documentation', 
    children: [
      {
        label: 'Get started', 
        path: '/docs/get-started'
      },
      {
        label: 'Theme and media queries', 
        path: '/docs/theme-media'
      },
      {
        label: 'Responsive variables', 
        path: '/docs/responsive-variables'
      },
      {
        label: 'Extend components', 
        path: '/docs/extend'
      },
      {
        label: 'Global styles', 
        path: '/docs/global'
      },
      {
        label: 'Server side rendering', 
        path: '/docs/ssr'
      },
    ]
  },
  { 
    label: 'API Reference', 
    path: '/api-ref',
    children: [
      {
        label: '@panache/core',
      },
      {
        label: '@panache/react',
      },
      {
        label: '@panache/reset',
      },
    ]
  },
]

export default index