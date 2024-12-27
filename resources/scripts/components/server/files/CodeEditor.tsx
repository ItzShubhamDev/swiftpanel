import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

// Language modes
import 'codemirror/mode/brainfuck/brainfuck'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/css/css'
import 'codemirror/mode/dart/dart'
import 'codemirror/mode/diff/diff'
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/erlang/erlang'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/go/go'
import 'codemirror/mode/handlebars/handlebars'
import 'codemirror/mode/htmlembedded/htmlembedded'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/julia/julia'
import 'codemirror/mode/lua/lua'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/nginx/nginx'
import 'codemirror/mode/perl/perl'
import 'codemirror/mode/php/php'
import 'codemirror/mode/properties/properties'
import 'codemirror/mode/protobuf/protobuf'
import 'codemirror/mode/pug/pug'
import 'codemirror/mode/python/python'
import 'codemirror/mode/rpm/rpm'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/rust/rust'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/smarty/smarty'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/toml/toml'
import 'codemirror/mode/twig/twig'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/yaml/yaml'

// Add-ons
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/foldgutter.css'
import modes from '~/modes'

interface CodeEditorProps {
  mime: string
  value: string
  onChange: (value: string) => void
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ mime, value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const cmInstanceRef = useRef<CodeMirror.Editor | null>(null)

  useEffect(() => {
    if (editorRef.current && !cmInstanceRef.current) {
      const mode = modes.find((m) => m.mimes?.includes(mime))?.mode || 'javascript'
      cmInstanceRef.current = CodeMirror(editorRef.current, {
        value: value,
        mode,
        theme: 'material',
        lineNumbers: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        lineWrapping: true,
        tabSize: 2,
        indentWithTabs: false,
      })

      cmInstanceRef.current.on('change', (instance) => {
        onChange(instance.getValue())
      })
    }
  }, [])

  useEffect(() => {
    const mode = modes.find((m) => m.mimes?.includes(mime))?.mode || 'javascript'
    if (cmInstanceRef.current) {
      cmInstanceRef.current.setOption('mode', mode)
    }
  }, [mime])

  return <div ref={editorRef} className="border border-gray-300 rounded-lg hover:cursor-text" />
}
