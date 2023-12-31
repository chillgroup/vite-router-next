import type { Plugin } from 'vite'
import { MODULE_ID, MODULE_ID_VIRTUAL } from './constants'
import { PageContext } from './context'
import { Options, resolveOptions } from './option'

function routerNextPlugin(userOptions?: Options): Plugin {
  let ctx: PageContext
  return {
    name: 'vite-router-next',
    enforce: 'pre',
    async configResolved(config) {
      const options = resolveOptions(config.root, userOptions)

      ctx = new PageContext(options, config.root)
      ctx.setLogger(config.logger)
      await ctx.walk()
    },
    configureServer(server) {
      ctx.setupViteServer(server)
    },
    resolveId(id) {
      if (id === MODULE_ID) {
        return MODULE_ID_VIRTUAL
      }
      return null
    },
    async load(id) {
      if (id === MODULE_ID_VIRTUAL) {
        return ctx.generateClientCode()
      }
    },
  }
}

export default routerNextPlugin
