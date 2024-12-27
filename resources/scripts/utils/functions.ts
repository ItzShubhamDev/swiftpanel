import modes from '~/modes'

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

export function formatDuration(ms: number) {
  if (ms < 0) ms = -ms

  const time = {
    d: Math.floor(ms / 86400000),
    h: Math.floor(ms / 3600000) % 24,
    m: Math.floor(ms / 60000) % 60,
    s: Math.floor(ms / 1000) % 60,
  }

  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map((val) => val[1] + val[0])
    .join(' ')
}

export function formatName(name: string) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase()
}

export function nameToMime(filename: string) {
  const name = filename.split('.')
  const ext = name[name.length - 1]
  const mode = modes.find((m) =>
    m.ext ? m.ext.includes(ext) : m.file ? m.file.test(filename) : false
  )
  return mode ? mode.mime : 'text/plain'
}
