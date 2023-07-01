import { slash } from '@antfu/utils'
import { FSWatcher, Logger, ViteDevServer } from 'vite'
import { Options, resolveOptions } from './option'
import { Route, generateClientCode, walk } from './route'
import { debug } from './utils/debug'
import { isTarget } from './utils/path'
import { invalidatePagesModule } from './utils/vite'

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
    this.setupWatcher(server.watcher)
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

  setupWatcher(watcher: FSWatcher) {
    watcher.on('add', async (path) => {
      path = slash(path)
      if (!isTarget(path, this.options)) return
      debug.hmr(`File created: ${path}`)
      this.walk()
      this.onUpdate()
    })
    watcher.on('unlink', async (path) => {
      path = slash(path)
      if (!isTarget(path, this.options)) return
      debug.hmr(`File removed: ${path}`)
      this.walk()
      this.onUpdate()
    })
    watcher.on('change', async (path) => {
      path = slash(path)
      if (!isTarget(path, this.options)) return
      debug.hmr(`File changed: ${path}`)
      if (path.includes('loader')) {
        this.onUpdate()
      }
    })
  }

  onUpdate() {
    if (!this._server) return
    invalidatePagesModule(this._server)
    debug.hmr('Reload generated pages.')
    this._server.ws.send({
      type: 'full-reload',
    })
  }
}
