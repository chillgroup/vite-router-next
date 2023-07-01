import { slash } from '@antfu/utils'
import { Logger, ViteDevServer } from 'vite'
import { Options, resolveOptions } from './option'
import { Route, generateClientCode, walk } from './route'
import { debug } from './utils/debug'

export class PageContext {
  private _server: ViteDevServer | undefined
  private _route: Route | undefined

  root: string
  options: Options
  logger?: Logger

  constructor(options: Options, viteRoot: string = process.cwd()) {
    this.root = slash(viteRoot)
    this.options = resolveOptions(options, this.root)
    debug.options(this.options)
  }

  setLogger(logger: Logger) {
    this.logger = logger
  }

  setupViteServer(server: ViteDevServer) {
    if (this._server === server) return
    this._server = server
  }

  async walk() {
    this._route = await walk(this.options.dir, this.root)
    console.log(JSON.stringify(this._route, null, 2))
  }

  async generateClientCode() {
    if (this._route) {
      return generateClientCode(this._route)
    }

    return `export default []`
  }
}
