import { Head, router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from '~/components/elements/Button'
import Input from '~/components/elements/Input'
import Select from '~/components/elements/Select'
import { CodeEditor } from '~/components/server/files/CodeEditor'
import modes from '~/modes'

export default function Page() {
  const { params } = usePage().props as unknown as { params: { 'id': string; '*': string[] } }
  const path = params['*'] ? params['*'].join('/') : ''
  const [mime, setMime] = useState('text/plain')
  const [code, setCode] = useState<string>('')
  const [name, setName] = useState<string>('')

  async function save() {
    if (!name) {
      toast.error('File name is required')
      return
    }
    const r = await fetch(`/api/client/servers/${params.id}/files/content?path=${path}/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: code }),
    })
    if (!r.ok) {
      toast.error('Failed to save file')
      return
    }
    toast.success('File saved successfully')
    router.get(`/server/${params.id}/files`)
  }

  return (
    <>
      <Head>
        <title>New File</title>
      </Head>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <Select value={mime} onChange={(v) => setMime(v)}>
            {modes.map((mode, i) => (
              <option key={i} value={mode.mime}>
                {mode.name}
              </option>
            ))}
          </Select>
          <div className="flex items-center space-x-2">
            <Input placeholder="File Name" value={name} onChange={setName} />
            <Button onClick={save}>Save File</Button>
          </div>
        </div>

        <div className="h-full overflow-hidden">
          <CodeEditor mime={mime} value={code} onChange={setCode} />
        </div>
      </div>
    </>
  )
}
