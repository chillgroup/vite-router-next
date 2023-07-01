# Route Groups

In the `pages` directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a **Route Group** to prevent the folder from being included in the route's URL path.

This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.

Route groups are useful for:

- Organizing routes into groups e.g. by site section, intent, or team.
- Enabling nested layouts in the same route segment level:
  - Creating multiple nested layouts in the same segment, including multiple root layouts
  - Adding a layout to a subset of routes in a common segment

## Convention
A route group can be created by adding prefixing the folder name with two underscores `__` e.g. `__admin`.

## Example

```
.
└── routes
    ├── __auth
    │   ├── layout.tsx
    │   ├── sign-in
    │   │   └── page.tsx
    │   └── sign-up
    │       └── page.tsx
    ├── layout.tsx
    └── page.tsx
```

**Vite Router Next** will generate two routes:
- `/sign-in`
- `/sign-up`

The `__auth/layout.tsx` component will serve as the layout component for `sign-in/page.tsx` and `sign-up/page.tsx`, but **__auth** will not be a route path segment.
