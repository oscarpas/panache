# Panache.js

Panache.js is a library for writing CSS as React components. Panache is inspired by Styled Components but it lets you write your CSS as Objects. 

Writing CSS as objects enables additional features such as:
- **Easy syntax:** One function to access props, theme and media query rules.
- **Reponsive variables:** Bind CSS values to one or multiple media query rules.
- **Share and extend styles:** Easily extend and share style objects across components with the spread operator.
- **Type safe:** Write type safe styles.

And just like Styled Components it comes with features such as:
- **Component scoped styles** 
- **Auto critical CSS**
- **Dynamic styling based on props**
- **Easy maintenance:** Styles are coupled to your component

## Get started

### Installation

```bash
# with npm
npm install --save panache-react

# with yarn
yarn add panache-react
```

### Create Panache components

The Panache component creator takes a Style Object or a function that returns a Style Object as argument. The creator can create any valid HTML element.

Below we'll initiate a `div` component and pass a Style Object to it.

```jsx
import panache from 'panache-react'

const MyComponent = panache.div({
  color: '#fff',
  backgroundColor: 'gray',
  padding: '20px'
})
```

Use it like a regular React component.

```jsx
<MyComponent>
  Hello, I'm a Panache component
</MyComponent>
```

### Dynamic style based on props

It's easy to adapt your components style based on props. To access props we pass a function to the component creator, the function will receive a props object where you can access any props you pass to the component.

```jsx
const MyComponent = panache.div(props => ({
  color: '#fff',
  backgroundColor: props.isClicked ? 'red' : 'gray',
  padding: '20px'
}))
```

```jsx
<MyComponent isClicked={isClicked} />
```

### Nested elements and pseudo selectors

You can target nested elements, pseudo selectors and custom classes with a SASS-like syntax.

```jsx
const MyComponent = panache.div({
  color: '#fff',
  backgroundColor: 'gray',
  div: {
    backgroundColor: 'red',
  },
  '&:hover': {
    backgroundColor: 'black',
  },
})
```

## Motivation

Writing CSS as React components is a great way to handle styles for an app. You get styles that are scoped and coupled to your component. You don't have to worry about unexpected styling due to inheritance and it's easy to maintain your styles when they are coupled to your components. This design pattern is used by several libraries and Panache builds on their great ideas.

Panache uses Style Objects instead of plain CSS which enables additional features because it's easy to parse and transform objects into CSS.

The main added features and their purpose are described below. These features may change and Panache is currently a proof of concept.

### Easy syntax

Props are easily available, just destructure once. Panache also has first class support for both theme and media queries.

```jsx
const MyComponent = panache.div(({ theme, media, isActive }) => ({
  color: theme.colors.primary,
  padding: '10px',
  backgroundColor: isActive ? 'white' : 'gray',
  [media.medium]: {
    padding: '20px'
  },
}))
```

### Responsive variables

One big feature that the Panache parser enables is responsive variables. With responsive values you can bind CSS values to media queries which can help keep styles consistant across devices and keep your code DRY.

The default value of the variable below is `10px` while `20px` is bound to a media query. This will automatically output the media query rules for you in the parsed CSS.

```jsx
const responsiveVariable = ['10px', ['@media(min-width: 768px', '20px']]

const MyComponent = panache.div({
  padding: responsiveVariable,
  marginTop: responsiveVariable
})
```

### Share and extend styles

Since your CSS is written as Style Objects it's easy and intuitive to extend simple styles with the spread operator.

```jsx
const MyComponent = panache.div(({ hasError, theme }) => ({
  ...MyOtherComponent.Styles,
  padding: responsiveVariable,
  marginTop: responsiveVariable,
  ...hasError && theme.myErrorStyles
}))
```

You can also compose multiple Components or Style Objects to create a new component.

```jsx
const MyComponent = panache.extend(MyOtherComponent, myStyleObject)({
  padding: '20px'
})
```

### Type safe

Another benefit of Style Objects is that since they're objects you can write type safe styles.

## Inspired by

[Styled Components](https://www.styled-components.com/), [Glamorous](https://glamorous.rocks/), [Emotion](https://emotion.sh/)
