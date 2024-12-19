import { createHash } from 'node:crypto'

export function md5(st: string) {
  return createHash('md5').update(st).digest('hex')
}
