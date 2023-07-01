# Defining Routes

This page will guide you through how to define and organize routes in your Next.js application.

## Creating Routes

Vite Router Next uses a file-system based router where **folders** are used to define routes.

Each folder represents a **route** segment that maps to a URL segment. To create a nested route, you can nest folders inside each other.

A special `page.js` file is used to make route segments publicly accessible.

For example, the following folder structure:

```
.
└── pages
    ├── page.tsx
    └── user
        └── page.tsx
```

Will generate the following routes:
- `/`
- `/user`

<div class="tip custom-block" style="padding-top: 8px">

**Good to know:** `.js`, `.jsx`, or `.tsx` file extensions can be used for special files.

</div>


## Creating UI
The most common are [pages](./pages-and-layouts.md#pages) to show UI unique to a route, and [layouts](./pages-and-layouts.md#layouts) to show UI that is shared across multiple routes.

For example, to create your first page, add a `page.tsx` file inside the `/pages` directory and export a React component:

::: code-group

```tsx [pages/page.tsx]
export default function IndexPage() {
  return <h1>Hello, Vite Router Next!</h1>
}
```

:::