export interface FileData {
  name: string
  created: string
  modified: string
  mode: string
  mode_bits: string
  size: number
  directory: boolean
  file: boolean
  symlink: boolean
  mime: string
}

export interface FileObject {
  key: string
  name: string
  mode: string
  modeBits: string
  size: number
  isFile: boolean
  isSymlink: boolean
  mimetype: string
  createdAt: Date
  modifiedAt: Date
  isArchiveType: () => boolean
  isEditable: () => boolean
}

export interface Language {
  id: string
  extensions?: string[]
  aliases: string[]
  mimetypes?: string[]
  filenames?: string[]
  firstLine?: string
}
