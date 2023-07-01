# Pages and Layouts
Vite Router Next has two file conventions, `layout.[jt]sx` and `page.[jt]sx` (abbreviated as `.tsx`). These two files determine the layout structure of the application. `layout.tsx` is used as the **layout component**, and `page.tsx` acts as the **page component**, which is the leaf node of the entire route (a route has only one leaf node and must end with a leaf node).


## Pages
A page is UI that is **unique** to a route. You can define pages by exporting a component from a `page.[jt]sx` file. Use nested folders to define a route and a `page.[jt]sx` file to make the route publicly accessible.

Create your first page by adding a `page.[jt]sx` file inside the app directory:

::: code-group

```tsx [pages/page.tsx]
export default function IndexPage() {
  return <h1>Hello, Vite Router Next!</h1>
}
```

```tsx [pages/admin/page.tsx]
export default function AdminIndexPage() {
  return <h1>Hello, Admin Index Page!</h1>
}
```

:::

<div class="tip custom-block" style="padding-top: 8px">

**Good to know:**

- A page is always the leaf of the route subtree.
- `.js`, `.jsx`, or `.tsx` file extensions can be used for Pages.
- A `page.js` file is required to make a route segment publicly accessible.
- Pages can fetch data. View the [Data Fetching](./data-fetching.md) section for more information.

</div>

## Layouts

A layout is UI that is **shared** between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be nested.

The `<Layout>` component refers to all `layout.tsx` files under the `pages/` directory. They represent the layout of the corresponding route segment and use `<Outlet>` (**React Router** component) to represent child components.

::: code-group

```tsx [pages/layout.tsx]
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  </div>
}
```


:::

::: info
`<Outlet>` is a new API in **React Router 6**. For more details, please refer to [Outlet](https://reactrouter.com/en/main/components/outlet#outlet).
:::

::: warning
`RootLayout` (`/pages/layout.tsx`) must be use `<Suspense>` component to wrap `<Outlet>` component, otherwise it will not work.
Because by default, all routes are lazy loaded, and `<Suspense>` is used to handle lazy loading.
:::

## Nested Layouts

To simplify the introduction of the relationship between `<Layout>` and `<Outlet>`, the following file directory is used as an example:

```
.
└── pages
    ├── blog
    │   └── page.tsx
    ├── layout.tsx
    ├── page.tsx
    └── user
        ├── layout.tsx
        └── page.tsx
```

1. When the route is `/`, the `<Outlet>` in `pages/layout.tsx` represents the component exported in `pages/page.tsx`, generating the following UI structure:

```tsx
<Layout>
  <Page />
</Layout>
```

2. When the route is `/blog`, the `<Outlet>` in `pages/layout.tsx` represents the component exported in `pages/blog/page.tsx`, generating the following UI structure:

```tsx
<Layout>
  <BlogPage />
</Layout>
```

3. When the route is `/user`, the `<Outlet>` in `pages/layout.tsx` represents the component exported in `pages/user/layout.tsx`. The `<Outlet>` in `pages/user/layout.tsx` represents the component exported in `pages/user/page.tsx`, generating the following UI structure:

```tsx
<Layout>
  <UserLayout>
    <UserPage />
  </UserLayout>
</Layout>
```

In summary, if there is a `layout.tsx` file under the sub-route's file directory, the `<Outlet>` in the parent `layout.tsx` will represent the `layout.tsx` in the sub-route file directory. Otherwise, it will represent the `page.tsx` in the sub-route file directory.