import { slash } from '@antfu/utils'
import fs from 'fs-extra'
import path from 'path'
import React from 'react'
import { JS_EXTENSIONS, NESTED_ROUTE } from './constants'
import {
  conventionNames,
  createIndexRoute,
  createMatchReg,
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
  lazyImport: string | null
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

export const generateClientCode = async (routes: Route) => {
  const components: string[] = []
  const loadings: string[] = []
  const errors: string[] = []
  const loaders: string[] = []

  const loadersMap: Record<
    string,
    {
      routeId: string
      filePath: string
      inline: boolean
    }
  > = {}
  const configs: string[] = []
  const configsMap: Record<string, any> = {}

  let rootLayoutCode = ``

  const traverseRouteTree = (route: Route): Route => {
    let children: Route['children']
    if ('children' in route && route.children) {
      children = route?.children?.map(traverseRouteTree)
    }
    let loading: string | undefined
    let error: string | undefined
    let loader: string | undefined
    let config: string | undefined
    let component = ''
    let lazyImport = null

    if (route.loading) {
      loadings.push(route.loading)
      loading = `loading_${loadings.length - 1}`
    }
    if (route.error) {
      errors.push(route.error)
      error = `error_${errors.length - 1}`
    }
    if (route.loader) {
      loaders.push(route.loader)
      const loaderId = loaders.length - 1
      loader = `loader_${loaderId}`
      loadersMap[loader] = {
        routeId: route.id!,
        filePath: route.loader,
        inline: false,
      }
    }
    if (typeof route.config === 'string') {
      configs.push(route.config)
      const configId = configs.length - 1
      config = `config_${configId}`
      configsMap[config] = route.config
    }
    if (route._component) {
      if (route.isRoot) {
        rootLayoutCode = `import RootLayout from '/${route._component}'`
        component = `RootLayout`
      } else {
        lazyImport = `() => import('/${route._component}')`
        component = `React.lazy(${lazyImport})`
      }
    }

    const finalRoute = {
      ...route,
      lazyImport,
      loading,
      loader,
      config,
      error,
      children,
    }

    if (route._component) {
      finalRoute.component = component
      finalRoute.element = `React.createElement(${component})`
    }
    return finalRoute
  }

  let routeComponentsCode = `
    export const routes = [
  `

  const newRoute = traverseRouteTree(routes)
  const routeStr = JSON.stringify(newRoute, null, 2)
  const keywords = [
    'component',
    'lazyImport',
    'loader',
    'loading',
    'error',
    'config',
    'element',
  ]

  const regs = keywords.map(createMatchReg)
  const newRouteStr = regs
    .reduce((acc, reg) => acc.replace(reg, '$1$2'), routeStr)
    .replace(/"(RootLayout)"/g, '$1')
    .replace(/\\"/g, '"')
  routeComponentsCode += `${newRouteStr},`
  routeComponentsCode += `\n];`

  const importLoadingCode = loadings
    .map((loading, index) => {
      return `import loading_${index} from '${loading}';\n`
    })
    .join('')

  const importComponentsCode = components
    .map((component, index) => {
      return `import component_${index} from '/${component}';\n`
    })
    .join('')

  const importErrorComponentsCode = errors
    .map((error, index) => {
      return `import error_${index} from '/${error}';\n`
    })
    .join('')

  let importLoadersCode = ''

  for (const [key, loaderInfo] of Object.entries(loadersMap)) {
    if (loaderInfo.inline) {
      importLoadersCode += `import { loader as ${key} } from "/${slash(
        loaderInfo.filePath
      )}";\n`
    } else {
      importLoadersCode += `import ${key} from "/${slash(
        loaderInfo.filePath
      )}";\n`
    }
  }

  let importConfigsCode = ''

  for (const [key, configPath] of Object.entries(configsMap)) {
    importConfigsCode += `import * as ${key} from "/${slash(configPath)}";\n`
  }

  return `
    import React from "react";
    ${importComponentsCode}
    ${rootLayoutCode}
    ${importLoadingCode}
    ${importErrorComponentsCode}
    ${importLoadersCode}
    ${importConfigsCode}
    ${routeComponentsCode}
    export default routes
  `
}
