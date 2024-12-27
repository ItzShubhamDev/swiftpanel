import { Play } from 'lucide-react'
import eggVariableTransformer from '#transformers/api/client/egg_variable'
import { useEffect, useState } from 'react'
import Input from '~/components/elements/Input'
import TextArea from '~/components/elements/TextArea'
import Select from '~/components/elements/Select'
import { toast } from 'react-toastify'
import { Head } from '@inertiajs/react'

type Startup = {
  data: ReturnType<typeof eggVariableTransformer>[]
  meta: {
    docker_images: Record<string, string>
    docker_image: string
    startup_command: string
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const [startup, setStartup] = useState<Startup | null>(null)
  const [images, setImages] = useState<{ value: string; label: string }[]>([])
  const [image, setImage] = useState('')
  const [variables, setVariables] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch(`/api/client/servers/${params.id}/startup`)
      .then((res) => res.json())
      .then((data) => setStartup(data))
  }, [])

  useEffect(() => {
    if (startup) {
      setImages(
        Object.entries(startup.meta.docker_images).map(([label, value]) => ({
          label,
          value,
        }))
      )
      setImage(startup.meta.docker_image)
      setVariables(
        startup.data.reduce(
          (acc, variable) => {
            acc[variable.attributes.env_variable] = variable.attributes.server_value
            return acc
          },
          {} as Record<string, string>
        )
      )
    }
  }, [startup])

  const save = async ({ name, value }: { name: string; value: string }) => {
    const r = await fetch(`/api/client/servers/${params.id}/startup/variable`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: name,
        value,
      }),
    })
    if (!r.ok) {
      toast.error(`Failed to save variable ${name}`, {
        autoClose: 2000,
        hideProgressBar: true,
      })
      return
    }
    toast.success(`Saved variable ${name}`, {
      autoClose: 2000,
      hideProgressBar: true,
    })
  }

  return (
    <>
      <Head>
        <title>Startup</title>
      </Head>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Play className="h-5 w-5 text-emerald-500" />
                Startup
              </h2>
            </div>
          </div>

          <div className="flex w-full p-6 space-x-4">
            <div className="w-3/5 flex flex-col ">
              <TextArea
                title="Startup Command"
                value={startup?.meta.startup_command!}
                placeholder="Startup"
              />
            </div>
            <div className="w-2/5">
              {images.find((i) => i.value === image) ? (
                <Select title="Docker Image" value={image} onChange={setImage}>
                  {images.map((image, i) => (
                    <option key={i} value={image.value}>
                      {image.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input title="Docker Image" value={image} onChange={() => {}} />
              )}
            </div>
          </div>

          <div className="flex flex-col p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Variables</h3>
            {startup && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {startup.data.map((variable, i) => (
                  <Input
                    key={i}
                    title={variable.attributes.name}
                    onChange={(value) => {
                      setVariables({ ...variables, [variable.attributes.env_variable]: value })
                      save({ name: variable.attributes.env_variable, value })
                    }}
                    value={variables[variable.attributes.env_variable]}
                    placeholder={variable.attributes.description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
