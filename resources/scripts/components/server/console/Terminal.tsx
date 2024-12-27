import { useEffect, useRef, useState } from 'react'

export default function Terminal({
  history,
  sendCommand,
}: {
  history: string[]
  sendCommand: (command: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendCommand(input)
      setInput('')
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-[70vh] text-gray-200 font-mono w-full">
      <div ref={ref} className="flex-1 p-4 overflow-y-auto bg-gray-800">
        {history.map((line, i) => (
          <div
            key={i}
            dangerouslySetInnerHTML={{
              __html: line.replace(/color:#00A/gi, 'color:#008000'),
            }}
          />
        ))}
      </div>
      <div className="border-t border-gray-700 bg-gray-800 p-4 shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-gray-200">{'>>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-200 focus:ring-0"
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}
