import type { ModuleNode, ViteDevServer } from 'vite'
import { MODULE_ID_VIRTUAL } from '../constants'

export const invalidatePagesModule = (server: ViteDevServer) => {
  const { moduleGraph } = server
  const mods = moduleGraph.getModulesByFile(MODULE_ID_VIRTUAL)
  if (mods) {
    const seen = new Set<ModuleNode>()
    mods.forEach((mod) => {
      moduleGraph.invalidateModule(mod, seen)
    })
  }
}
