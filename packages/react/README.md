# panache-react

Styled components using Styled Objects for React, read the docs here: [Panache Docs](https://panachejs.netlify.app/)

## Development

This package depends on the core package, so build that first:

```bash
cd packages/core
yarn install
yarn run build
```

The react package can then be built:

```bash
cd packages/react
yarn install
yarn run build

# Or to watch files:
yarn run dev
```

Alternatively you can build all packages at once with lerna, from the root of the repo:

```
lerna run build
```