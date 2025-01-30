import { useState } from 'react'
import Input from '~/components/elements/Input'
import Modal from '~/components/elements/Modal'

export default function NewDirectoryModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose: () => void
  onCreate: (name: string) => void
}) {
  const [name, setName] = useState('')
  return (
    <Modal isOpen={open} onClose={onClose} title={`New Directory`}>
      <Input value={name} onChange={setName} title="Name" />
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-500 dark:text-gray-100 border dark:border-gray-600 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={() => onCreate(name)}
          className="px-4 py-2 text-white bg-emerald-500 rounded-md"
        >
          Create
        </button>
      </div>
    </Modal>
  )
}
