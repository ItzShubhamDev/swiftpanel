import { useEffect, useState } from 'react'
import Modal from '~/components/elements/Modal'

export default function RenameModal({
  open,
  onClose,
  onRename,
  name,
  type,
}: {
  open: boolean
  onClose: () => void
  onRename: (name: string) => void
  name: string
  type?: 'file' | 'folder'
}) {
  const [newName, setNewName] = useState(name)

  useEffect(() => {
    setNewName(name)
  }, [name])

  return (
    <Modal isOpen={open} onClose={onClose} title={`Rename ${type == 'file' ? 'File' : 'Folder'}`}>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <div className="flex justify-end mt-4 space-x-2">
        <button onClick={onClose} className="px-4 py-2 text-gray-500 border rounded-md">
          Cancel
        </button>
        <button
          onClick={() => onRename(newName)}
          className="px-4 py-2 text-white bg-blue-500 border rounded-md"
        >
          Rename
        </button>
      </div>
    </Modal>
  )
}
