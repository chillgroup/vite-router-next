export const MODULE_ID = '@chillgroup/vite-router-next/routes'
export const MODULE_ID_VIRTUAL = '/@chillgroup/@vite-router-next/routes'

export const JS_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx']
export const JS_EXTENSIONS_RE = new RegExp(
  `\\.(${JS_EXTENSIONS.map((ext) => ext.slice(1)).join('|')})$`
)
export const FILE_SYSTEM_ROUTES_LAYOUT = '_layout'
export const FILE_SYSTEM_ROUTES_IGNORED_REGEX =
  /\.(d|test|spec|e2e)\.(js|jsx|ts|tsx)$/

export const NESTED_ROUTE = {
  LAYOUT_FILE: 'layout',
  LAYOUT_LOADER_FILE: 'layout.loader',
  PAGE_FILE: 'page',
  PAGE_LOADER_FILE: 'page.loader',
  LOADING_FILE: 'loading',
  ERROR_FILE: 'error',
  LOADER_FILE: 'loader',
  SPLATE_FILE: '$',
  SPLATE_LOADER_FILE: '$.loader',
  LAYOUT_CONFIG_FILE: 'layout.config',
  PAGE_CONFIG_FILE: 'page.config',
}
