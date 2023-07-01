import fs from 'fs-extra'
import path from 'path'
import React from 'react'
import { JS_EXTENSIONS, NESTED_ROUTE } from './constants'
import {
  conventionNames,
  createIndexRoute,
  createRoute,
  replaceDynamicPath,
} from './utils/route'

export type Route = Partial<{
  caseSensitive: boolean
  path: string
  id: string
  loader: any
  action: any
  hasErrorBoundary: boolean
  shouldRevalidate: any
  handle: any
  index: boolean
  children?: Route[] | undefined
  element: React.ReactNode | null
  errorElement: React.ReactNode | null
  parentId?: string
  filename?: string
  _component?: string
  component?: string
  lazyImport?: () => Promise<any>
  loading?: string
  error?: string
  isRoot?: boolean
  config?: string | Record<string, any>
}>

export const walk = async (
  dirname: string,
  rootDir: string
): Promise<Route | undefined> => {
  if (!(await fs.pathExists(dirname))) {
    return undefined
  }
  const isDirectory = (await fs.stat(dirname)).isDirectory()
  if (!isDirectory) {
    return undefined
  }

  const relativeDir = path.relative(rootDir, dirname)
  const pathSegments = relativeDir.split(path.sep)
  const lastSegment = pathSegments[pathSegments.length - 1]

  const isRoot = lastSegment === 'pages'
  const isPathlessLayout = lastSegment.startsWith('__')
  const isWithoutLayoutPath = lastSegment.includes('.')
  let routePath = isRoot || isPathlessLayout ? '/' : `${lastSegment}`
  if (isWithoutLayoutPath) {
    routePath = lastSegment.split('.').join('/')
  }
  routePath = replaceDynamicPath(routePath)

  const route: Partial<Route> = {
    path: routePath?.replace(/\$$/, '?'),
    children: [],
    isRoot,
  }

  let pageLoaderFile = ''
  let pageRoute = null
  let splatLoaderFile = ''
  let splatRoute = null
  let pageConfigFile = ''

  const items = await fs.readdir(dirname)

  for (const item of items) {
    const itemPath = path.join(dirname, item)
    const extname = path.extname(item)

    const itemWithoutExt = item.slice(0, -extname.length)

    const isDirectory = (await fs.stat(itemPath)).isDirectory()
    if (isDirectory) {
      const childRoute = await walk(itemPath, rootDir)
      if (childRoute) {
        route.children?.push(childRoute)
      }
    }

    if (
      extname &&
      (!JS_EXTENSIONS.includes(extname) ||
        !conventionNames.includes(itemWithoutExt))
    ) {
      continue
    }

    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_LOADER_FILE) {
      if (!route.loader) {
        route.loader = itemPath
      }
    }

    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_CONFIG_FILE) {
      if (!route.config) {
        route.config = itemPath
      }
    }

    if (itemWithoutExt === NESTED_ROUTE.LAYOUT_FILE) {
      route._component = itemPath
    }

    if (itemWithoutExt === NESTED_ROUTE.PAGE_LOADER_FILE) {
      pageLoaderFile = itemPath
    }

    if (itemWithoutExt === NESTED_ROUTE.PAGE_CONFIG_FILE) {
      pageConfigFile = itemPath
    }

    if (itemWithoutExt === NESTED_ROUTE.PAGE_FILE) {
      pageRoute = createIndexRoute(
        {
          _component: itemPath,
        } as Route,
        rootDir,
        itemPath
      )

      if (pageLoaderFile) {
        pageRoute.loader = pageLoaderFile
      }
      if (pageConfigFile) {
        pageRoute.config = pageConfigFile
      }
      route.children?.push(pageRoute)
    }

    if (itemWithoutExt === NESTED_ROUTE.SPLATE_LOADER_FILE) {
      splatLoaderFile = itemPath
    }

    if (itemWithoutExt === NESTED_ROUTE.SPLATE_FILE) {
      splatRoute = createRoute(
        {
          _component: itemPath,
          path: '*',
        },
        rootDir,
        itemPath
      )

      if (splatLoaderFile) {
        splatRoute.loader = splatLoaderFile
      }
      route.children?.push(splatRoute)
    }

    if (itemWithoutExt === NESTED_ROUTE.LOADING_FILE) {
      route.loading = itemPath
    }

    if (itemWithoutExt === NESTED_ROUTE.ERROR_FILE) {
      route.error = itemPath
    }
  }

  let finalRoute = createRoute(
    route,
    rootDir,
    path.join(dirname, `${NESTED_ROUTE.LAYOUT_FILE}.ts`)
  )

  /**
   * when the url is /, the __auth/layout.tsx component should not be rendered
   * - routes
   *  - __auth
   *    - layout.tsx
   *  - layout.tsx
   */
  if (isPathlessLayout) {
    delete finalRoute.path
  }

  route.children = route.children?.filter((childRoute) => childRoute)

  if (route.children && route.children.length === 0 && !route.index) {
    return undefined
  }

  /**
   * Make sure access /user, which renders the user/$.tsx component
   * - routes
   *  - user
   *    - $.tsx
   *  - layout.tsx
   */
  if (
    finalRoute.children &&
    finalRoute.children.length === 1 &&
    !finalRoute._component
  ) {
    const childRoute = finalRoute.children[0]
    if (childRoute.path === '*') {
      const path = `${finalRoute.path || ''}/${childRoute.path || ''}`
      finalRoute = {
        ...childRoute,
        path,
      }
    }
  }

  return finalRoute
}
