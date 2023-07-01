import fs from 'fs'
import path from 'path'
import {
  FILE_SYSTEM_ROUTES_IGNORED_REGEX,
  FILE_SYSTEM_ROUTES_LAYOUT,
  JS_EXTENSIONS,
  NESTED_ROUTE,
} from '../constants'
import { Route } from '../route'
import { findExists, getPathWithoutExt, normalizeToPosixPath } from './path'

export const findLayout = (dir: string) => {
  return findExists(
    JS_EXTENSIONS.map((ext) =>
      path.resolve(dir, `${FILE_SYSTEM_ROUTES_LAYOUT}${ext}`)
    )
  )
}

export const shouldSkip = (file: string): boolean => {
  // should not skip directory.
  if (fs.statSync(file).isDirectory()) {
    return false
  }

  const ext = path.extname(file)

  if (
    FILE_SYSTEM_ROUTES_IGNORED_REGEX.test(file) ||
    !JS_EXTENSIONS.includes(ext)
  ) {
    return true
  }

  return false
}

export const replaceDynamicPath = (routePath: string) => {
  return routePath.replace(/\[(.*?)\]/g, ':$1')
}

export const conventionNames = Object.values(NESTED_ROUTE)

export const getRouteId = (componentPath: string, routesDir: string) => {
  const relativePath = normalizeToPosixPath(
    path.relative(routesDir, componentPath)
  )
  const pathWithoutExt = getPathWithoutExt(relativePath)

  return pathWithoutExt.replace(/\[(.*?)\]/g, '($1)')
}

export const createRoute = (
  routeInfo: Route,
  rootDir: string,
  filename: string
): Route => {
  const id = getRouteId(filename, rootDir)
  return {
    ...routeInfo,
    id,
  }
}

export const createIndexRoute = (
  routeInfo: Route,
  rootDir: string,
  filename: string
): Route => {
  return createRoute(
    {
      ...routeInfo,
      index: true,
      children: undefined,
    },
    rootDir,
    filename
  )
}

export const createMatchReg = (keyword: string) =>
  new RegExp(`("${keyword}":\\s)"([^,]+)"`, 'g')
