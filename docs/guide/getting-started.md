# Getting Started

## Installation

### Prerequisites
::: code-group

```sh [npm]
$ npm install -D @chillgroup/vite-router-next
$ npm install react-router-dom
```

```sh [pnpm]
$ pnpm add -D @chillgroup/vite-router-next
$ pnpm add react-router-dom
```

```sh [yarn]
$ yarn add -D @chillgroup/vite-router-next
$ yarn add react-router-dom
```

:::


### Setup Wizard
Add `@chillgroup/vite-router-next` to `vite.config.js`

```ts
import routerNext from '@chillgroup/vite-router-next'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [..., routerNext()],
})
```

Update `main.tsx` to use `@chillgroup/vite-router-next`

```tsx
import routes from '@chillgroup/vite-router-next/routes'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
```

Now you can create a `pages` folder and add your routes as files.

## Simple example

For example, file structure should look like this:

```
└─ pages
   ├─ page.tsx
   └─ user
      └─ page.tsx
```

See more in [React Example](https://github.com/chillgroup/vite-router-next/tree/main/examples/react)