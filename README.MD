# Vite Router Next

> Vite Router Next is file system based routing for React using Vite

## Features

Vite Router Next supports the following features:

- Dynamic Routing
- Dynamic Optional Routing
- Catch All Routing
- No-path Layout
- Loading
- [Error Boundary](https://reactrouter.com/en/main/route/route#errorelementerrorboundary)
- [Loader](https://reactrouter.com/en/main/route/loader), [`useLoaderData`](https://reactrouter.com/en/main/hooks/use-loader-data) and [`defer`](https://reactrouter.com/en/main/guides/deferred)

> [Lazy loading](https://reactrouter.com/en/main/route/lazy) is default in Vite Router Next. It keeps your bundle size small and only loads the code for the route the user is on.

> Vite Router Next use `loader` API, so you must use new routers from `react-router-dom@6.4` and above.
> `createBrowserRouter`, `createMemoryRouter`, `createHashRouter`, `createStaticRouter`

## Getting Started

### Install

- Install `@chillgroup/vite-router-next` and `react-router-dom`

```sh
npm install -D @chillgroup/vite-router-next
npm install react-router-dom
```

- Add `@chillgroup/vite-router-next` to `vite.config.js`

```js
import routerNext from '@chillgroup/vite-router-next'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [..., routerNext()],
})
```

- Update `main.tsx` to use `@chillgroup/vite-router-next`

```js
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

### Details

[Updating]

### Examples

- [Basic](./examples/react/)
- [TODO] With React Query

### License

[MIT](./LICENSE).
