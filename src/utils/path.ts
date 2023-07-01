import { slash } from '@antfu/utils'
import fs from 'fs-extra'
import path, { resolve } from 'path'
import upath from 'upath'
import { JS_EXTENSIONS_RE } from '../constants'
import { Options } from '../option'

export const findExists = (files: string[]): string | false => {
  for (const file of files) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      return file
    }
  }
  return false
}

export const normalizeToPosixPath = (p: string | undefined) =>
  upath
    .normalizeSafe(path.normalize(p || ''))
    .replace(/^([a-zA-Z]+):/, (_, m: string) => `/${m.toLowerCase()}`)

export const getPathWithoutExt = (filename: string) => {
  const extname = path.extname(filename)
  return filename.slice(0, -extname.length)
}

export const isPageDir = (path: string, option: Options) => {
  const dirPath = slash(resolve(option.root, option.dir))
  return path.startsWith(dirPath)
}

export const isTarget = (path: string, option: Options) => {
  return isPageDir(path, option) && JS_EXTENSIONS_RE.test(path)
}
