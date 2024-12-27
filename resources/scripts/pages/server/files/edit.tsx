import { Head, router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '~/components/elements/Button'
import Select from '~/components/elements/Select'
import { CodeEditor } from '~/components/server/files/CodeEditor'
import modes from '~/modes'
import { nameToMime } from '~/utils/functions'

export default function Page() {
  const { params } = usePage().props as unknown as { params: { 'id': string; '*': string[] } }
  const path = params['*'] ? params['*'].join('/') : ''
  const [mime, setMime] = useState('text/javascript')
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/client/servers/${params.id}/files/content?path=${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCode(data.content)
      })
  }, [])

  useEffect(() => {
    setMime(nameToMime(path))
  }, [path])

  async function save() {
    const r = await fetch(`/api/client/servers/${params.id}/files/content?path=${path}`, {
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
        <title>Edit File</title>
      </Head>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <Select value={mime} onChange={(v) => setMime(v)}>
            {modes.map((mode, i) => (
              <option key={i} value={mode.mime}>
                {mode.name}
              </option>
            ))}
          </Select>
          <Button onClick={save}>Save Changes</Button>
        </div>

        <div className="h-full overflow-hidden">
          {typeof code === 'string' && <CodeEditor mime={mime} value={code} onChange={setCode} />}
        </div>
      </div>
    </>
  )
}
