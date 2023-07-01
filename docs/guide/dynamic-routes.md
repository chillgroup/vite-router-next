# Dynamic Routes

When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time.

## Dynamic Routing
Routes generated from file directories named with [] will be handled as dynamic routes. For example, the following file directory:

```
└── routes
    ├── [id]
    │   └── page.tsx
    ├── contact
    │   └── page.tsx
    └── page.tsx
```

The `pages/[id]/page.tsx` file will be converted to the `/:id` route. Except for the exact matching `/contact` route, all other `/xxx` routes will match this route.

In the component, you can use [`useParams`](https://reactrouter.com/en/main/hooks/use-params) to get the corresponding named parameter.

In the loader, params will be passed as the input parameter of the [`loader function`](https://reactrouter.com/en/main/route/loader#params), and you can get the parameter value through `params.xxx`.\
See more details in [Data Fetching](./data-fetching.md).

## Dynamic Optional Routing

Routes generated from file directories named with `[$]` will be treated as dynamic optional routes. For example, the following file directory:

```
└── routes
    ├── blog
    │   └── [id$]
    │       └── page.tsx
    ├── about
    │   └── page.tsx
    └── page.tsx
```

The `pages/blog/[id$]/page.tsx` file will be converted to the `/blog/:id?` route. All routes under `/blog` will match this route, and the `id` parameter is optional. This route is usually used to distinguish between **creation** and **editing**.

Same as dynamic routing, you can use [`useParams`](https://reactrouter.com/en/main/hooks/use-params) to get the corresponding named parameter. Loader function will also receive the parameter value through `params.xxx`.