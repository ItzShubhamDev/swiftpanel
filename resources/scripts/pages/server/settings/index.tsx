import { Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import Input from '~/components/elements/Input'
import { toast } from 'react-toastify'
import serverTransformer from '#transformers/api/client/server'
import TextArea from '~/components/elements/TextArea'
import Button from '~/components/elements/Button'
import { Head } from '@inertiajs/react'

type Server = ReturnType<typeof serverTransformer>

export default function Page({ params }: { params: { id: string } }) {
  const [server, setServer] = useState<Server>()
  const [settings, setSettings] = useState<{
    name: string
    description: string
  }>({ name: '', description: '' })

  useEffect(() => {
    fetch(`/api/client/servers/${params.id}`)
      .then((res) => res.json())
      .then((data) => setServer(data))
  }, [])

  useEffect(() => {
    setSettings({
      name: server?.attributes.name!,
      description: server?.attributes.description!,
    })
  }, [server])

  const saveSettings = async () => {
    const r = await fetch(`/api/client/servers/${params.id}/settings/rename`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: settings?.name,
        description: settings?.description,
      }),
    })

    if (!r.ok) {
      toast.error('Failed to save server settings!')
      return
    }
    toast.success('Server settings saved successfully!')
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <Settings className="h-5 w-5 text-emerald-500" />
                Settings
              </h2>
              <Button onClick={saveSettings}>Save Settings</Button>
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex flex-col w-1/2 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Server Details</h3>
              <Input
                title="Server Name"
                value={settings?.name}
                placeholder="Server"
                onChange={(value) => setSettings({ ...settings, name: value })}
              />
              <TextArea
                title="Server Description"
                value={settings?.description}
                placeholder="Description"
                onChange={(value) => setSettings({ ...settings, description: value })}
              />
            </div>
            <div className="flex flex-col w-1/2 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Debug Info</h3>
              <Input
                title="Node"
                value={server?.attributes.node!}
                placeholder="Node"
                onChange={() => {}}
                disabled
              />
              <Input
                title="Server ID"
                value={server?.attributes.uuid!}
                placeholder="UUID"
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
