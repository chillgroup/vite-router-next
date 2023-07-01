import fs from 'fs-extra'
import path from 'path'
import upath from 'upath'

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
