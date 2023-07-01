import type { Plugin } from 'vite'

function routerNextPlugin(): Plugin {
  return {
    name: 'vite-router-next',
    enforce: 'pre',
  }
}

export default routerNextPlugin
