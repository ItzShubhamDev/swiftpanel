import { FileData, FileObject } from '#types/client/files'

export const fileDataToFileObject = (data: FileData): FileObject => ({
  key: `${data.file ? 'file' : 'dir'}_${data.name}`,
  name: data.name,
  mode: data.mode,
  modeBits: data.mode_bits,
  size: Number(data.size),
  isFile: data.file,
  isSymlink: data.symlink,
  mimetype: data.mime,
  createdAt: new Date(data.created),
  modifiedAt: new Date(data.modified),

  isArchiveType: function () {
    return (
      this.isFile &&
      [
        'application/vnd.rar', // .rar
        'application/x-rar-compressed', // .rar (2)
        'application/x-tar', // .tar
        'application/x-br', // .tar.br
        'application/x-bzip2', // .tar.bz2, .bz2
        'application/gzip', // .tar.gz, .gz
        'application/x-gzip',
        'application/x-lzip', // .tar.lz4, .lz4 (not sure if this mime type is correct)
        'application/x-sz', // .tar.sz, .sz (not sure if this mime type is correct)
        'application/x-xz', // .tar.xz, .xz
        'application/zstd', // .tar.zst, .zst
        'application/zip', // .zip
        'application/x-7z-compressed', // .7z
      ].indexOf(this.mimetype) >= 0
    )
  },

  isEditable: function () {
    if (this.isArchiveType() || !this.isFile) return false

    const matches = [
      'application/jar',
      'application/octet-stream',
      'inode/directory',
      /^image\/(?!svg\+xml)/,
    ]

    return matches.every((m) => !this.mimetype.match(m))
  },
})
