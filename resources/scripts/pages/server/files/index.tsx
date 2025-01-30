import { useEffect, useState } from 'react'
import {
  HardDrive,
  Folder,
  Upload,
  Download,
  Trash2,
  FolderPen,
  FolderSymlink,
  FolderArchive,
  FilePen,
  FileSymlink,
  FileArchive,
  Files,
  FilePlus,
  FolderPlus,
  LoaderCircle,
} from 'lucide-react'
import FileIcon from '~/components/server/files/Icon'
import { FileData, FileObject } from '#types/client/files'
import { fileDataToFileObject } from '~/utils/transformers'
import { formatBytes } from '~/utils/functions'
import { Head, usePage } from '@inertiajs/react'
import LastSeen from '~/components/server/files/LastSeen'
import { toast } from 'react-toastify'
import { Link } from '@inertiajs/react'
import RenameModal from '~/components/server/files/RenameModal'
import NewDirectoryModal from '~/components/server/files/NewDirectoryModal'

export default function Page() {
  const { params } = usePage().props as unknown as { params: { 'id': string; '*': string[] } }
  const [files, setFiles] = useState<FileObject[]>([])
  const path = params['*'] ? params['*'].join('/') : ''
  const [loading, setLoading] = useState(true)

  const [renameModal, setRenameModal] = useState<{
    open: boolean
    name: string
    type: 'file' | 'folder'
  }>({
    open: false,
    name: '',
    type: 'file',
  })

  const [newDirectoryModal, setNewDirectoryModal] = useState(false)

  useEffect(() => {
    fetch(`/api/client/servers/${params.id}/files/${path}`)
      .then((res) => res.json())
      .then((data) => {
        const files = data.map((file: FileData) => fileDataToFileObject(file))
        setFiles(files)
        setLoading(false)
      })
  }, [path])

  const deleteFunc = async (name: string) => {
    const r = await fetch(`/api/client/servers/${params.id}/files`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ files: [name], path }),
    })
    if (!r.ok) {
      toast.error('Failed to delete file')
      return
    }
    setFiles(files.filter((x) => x.name !== name))
    toast.success('File deleted successfully')
  }

  const rename = async (name: string, newName: string) => {
    const r = await fetch(`/api/client/servers/${params.id}/files`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, path, newName }),
    })
    if (!r.ok) {
      toast.error('Failed to rename file')
      return
    }
    setFiles(files.map((x) => (x.name === name ? { ...x, name: newName } : x)))
    toast.success('File renamed successfully')
    setRenameModal({ open: false, name: '', type: 'file' })
  }

  const createDirectory = async (name: string) => {
    const r = await fetch(`/api/client/servers/${params.id}/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, path }),
    })
    if (!r.ok) {
      toast.error('Failed to create directory')
      return
    }
    const data = await r.json()
    setFiles(data)
    toast.success('Directory created successfully')
  }

  const download = async (name: string) => {
    const r = await fetch(
      `/api/client/servers/${params.id}/files/content/download?path=${path}/${name}`
    )
    if (!r.ok) {
      toast.error('Failed to download file')
      return
    }
    const data = await r.json()
    const url = data.url
    if (!url) {
      toast.error('Failed to download file')
    }
    const res = await fetch(url)
    const blob = await res.blob()
    const u = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = u
    a.download = name
    a.click()
    a.remove()
    window.URL.revokeObjectURL(u)
  }

  return (
    <>
      <Head>
        <title>File Manager</title>
      </Head>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-emerald-500" />
                File Manager
              </h2>
              <div className="flex gap-2 text-gray-700 dark:text-gray-200">
                <button className="px-3 py-2 hover:scale-110 transition-transform duration-200 rounded-lg flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </button>
                <button
                  className="px-3 py-2 hover:scale-110 transition-transform duration-200 rounded-lg flex items-center gap-2"
                  onClick={() => setNewDirectoryModal(true)}
                >
                  <FolderPlus className="h-4 w-4" />
                  New Folder
                </button>
                <Link
                  href={`/server/${params.id}/files/new/${path}`}
                  className="px-3 py-2 hover:scale-110 transition-transform duration-200 rounded-lg flex items-center gap-2"
                >
                  <FilePlus className="h-4 w-4" />
                  New File
                </Link>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-200">
              <span className="font-medium">
                / home / <Link href={`/server/${params.id}/files`}>container</Link>
                {path.split('/').map((dir, index) => (
                  <span key={index}>
                    {' / '}
                    <Link
                      href={`/server/${params.id}/files/${path
                        .split('/')
                        .slice(0, index + 1)
                        .join('/')}`}
                    >
                      {dir}
                    </Link>
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {files.length > 0 ? (
              <div className="w-full">
                <div className="w-full flex">
                  <div className="w-full grid grid-cols-8 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-500 dark:text-gray-200">
                    <div className="col-span-5 px-6 py-3 text-left uppercase tracking-wider">
                      Name
                    </div>
                    <div className="px-6 py-3 text-left uppercase tracking-wider">Size</div>
                    <div className="col-span-2 px-6 py-3 text-left uppercase tracking-wider">
                      Last Modified
                    </div>
                  </div>
                  <div className="w-48 px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                    Actions
                  </div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-900">
                  {files
                    .filter((x) => !x.isFile)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((dir, index) => (
                      <div
                        key={index}
                        className="w-full flex hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Link
                          className="w-full grid grid-cols-8 items-center hover:bg-gray-50 dark:hover:bg-gray-700"
                          href={`/server/${params.id}/files${path ? `/${path}/` : '/'}${dir.name}`}
                        >
                          <div className="col-span-5 px-6 py-4 flex items-center whitespace-nowrap w-1/2">
                            <Folder className="h-5 w-5 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                              {dir.name}
                            </span>
                          </div>
                          <div className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap" />
                          <div className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <LastSeen date={new Date(dir.modifiedAt)} />
                          </div>
                        </Link>
                        <div className="w-48 px-6 py-4 flex justify-center whitespace-nowrap space-x-1">
                          <button
                            className="text-gray-500 dark:text-gray-200 hover:scale-125 transition-transform duration-200"
                            onClick={() =>
                              setRenameModal({ open: true, name: dir.name, type: 'folder' })
                            }
                          >
                            <FolderPen className="h-5 w-5" />
                          </button>
                          <button className="text-cyan-500 hover:scale-125 transition-transform duration-200">
                            <FolderSymlink className="h-5 w-5" />
                          </button>
                          <button className="text-yellow-500 hover:scale-125 transition-transform duration-200">
                            <FolderArchive className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-500 hover:scale-125 transition-transform duration-200"
                            onClick={() => deleteFunc(dir.name)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  {files
                    .filter((x) => x.isFile)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((file, index) => (
                      <div
                        key={index}
                        className="w-full flex hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Link
                          href={`/server/${params.id}/files/edit/${path}${file.name}`}
                          disabled={!file.isEditable()}
                          className={
                            'w-full grid grid-cols-8 items-center ' +
                            `${!file.isEditable() ? 'cursor-default pointer-events-none' : ''}`
                          }
                          aria-disabled={!file.isEditable()}
                          tabIndex={!file.isEditable() ? -1 : undefined}
                        >
                          <div className="col-span-5 w-full px-6 py-4 flex items-center whitespace-nowrap">
                            <FileIcon filename={file.name} className="h-5 w-5" />
                            <span className="ml-2 text-sm text-gray-900 dark:text-gray-200">
                              {file.name}
                            </span>
                          </div>
                          <div className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {formatBytes(file.size)}
                          </div>
                          <div className="col-span-2 px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <LastSeen date={new Date(file.modifiedAt)} />
                          </div>
                        </Link>
                        <div className="w-48 px-6 py-4 flex justify-center whitespace-nowrap space-x-1">
                          <button
                            className=" text-indigo-500 hover:scale-125 transition-transform duration-2"
                            onClick={() => download(file.name)}
                          >
                            <Download className="h-5 w-5" />
                          </button>
                          <button
                            className="text-gray-500 dark:text-gray-200 hover:scale-125 transition-transform duration-2"
                            onClick={() =>
                              setRenameModal({ open: true, name: file.name, type: 'file' })
                            }
                          >
                            <FilePen className="h-5 w-5" />
                          </button>
                          <button className=" text-cyan-500 hover:scale-125 transition-transform duration-2">
                            <FileSymlink className="h-5 w-5" />
                          </button>
                          <button className="text-yellow-500 hover:scale-125 transition-transform duration-2">
                            <FileArchive className="h-5 w-5" />
                          </button>
                          <button className="text-green-500 hover:scale-125 transition-transform duration-2">
                            <Files className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-500 hover:scale-125 transition-transform duration-2"
                            onClick={() => deleteFunc(file.name)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <>
                {loading ? (
                  <div className="h-full text-emerald-500 overflow-hidden flex justify-center w-full p-4">
                    <LoaderCircle className="animate-spin h-8 w-8 " />
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">No files found</div>
                )}
              </>
            )}
          </div>
        </div>
        <NewDirectoryModal
          open={newDirectoryModal}
          onClose={() => setNewDirectoryModal(false)}
          onCreate={createDirectory}
        />
        <RenameModal
          open={renameModal.open}
          onClose={() => setRenameModal({ open: false, name: '', type: 'file' })}
          name={renameModal.name}
          onRename={(name) => {
            rename(renameModal.name, name)
          }}
          type={renameModal.type}
        />
      </div>
    </>
  )
}
