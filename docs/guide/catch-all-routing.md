# Catch All Routing

If you add a `$.tsx` file to the `pages` directory, it will be used as the catch-all routing component. This component will be rendered if there is no matching route.

:::tip info
`$.tsx` can be thought of as a unique page route component. If the current directory has a `layout.tsx` file, `$.tsx` will be rendered as a child component of layout.
:::

For example, the following directory structure:
```
└── pages
    ├── $.tsx
    ├── contact
    │   └── page.tsx
    └── page.tsx
```

When a path that does not match is accessed, the `pages/$.tsx` component is rendered. Similarly, in `$.tsx`, you can use `useParams` to grab the remaining bits of the URL.

::: code-group

```tsx [pages/$.tsx]
import { useParams } from 'react-router-dom';
// When the path is `/xxx/yyy`
const params = useParams();
params['*']; // => 'xxx/yyy'
```

:::

