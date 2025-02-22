import { useEffect, useState } from 'react'
import Input from '~/components/elements/Input'
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
      <Input value={newName} onChange={setNewName} title="New Name" />
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-500 dark:text-gray-100 border dark:border-gray-600 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={() => onRename(newName)}
          className="px-4 py-2 text-white bg-emerald-500 rounded-md"
        >
          Rename
        </button>
      </div>
    </Modal>
  )
}
