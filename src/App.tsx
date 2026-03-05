import { useCallback, useState } from 'react'
import toast from 'react-hot-toast';

const COLORS = {
  key: "text-sky-400",
  string: "text-emerald-400",
  number: "text-amber-400",
  boolean: "text-purple-400",
  null: "text-rose-400",
}

function highlight(json: string) {
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = COLORS.number;
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? COLORS.key : COLORS.string;
      } else if (/true|false/.test(match)) {
        cls = COLORS.boolean;
      } else if (/null/.test(match)) {
        cls = COLORS.null;
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [indent, setIndent] = useState(2)

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input, indent])

  const minify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    } 
  }, [input])

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    toast.success('Copied to clipboard', {
      duration: 2000
    })
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }

  const validateJSON = () => {
    if(!input) return
    try {
      JSON.parse(input)
      toast.success('JSON is valid', {
        duration: 2000
      })
    } catch (e) {
      toast.error("JSON is invalid", {
        duration: 2000
      })
    }
  }

  return (
    <div className='min-h-screen bg-gray-950 text-gray-100 flex flex-col'>
      <header className='border-b border-gray-800 px-6 py-4 flex items-center justify-between'>
        <h1 className='text-xl font-mono font-bold tracking-tight text-white'>
          JSON <span className='text-sky-400'>Formatter</span>
        </h1>
        <div className='flex items-center gap-3'>
          <label className='text-sm text-gray-400 font-mono'>Indent</label>
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded px-2 py-1 font-mono">
            {[2, 4, 8].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </header>

      <div className='flex gap-2 px-6 py-3 border-b border-gray-800'>
        <button onClick={format} className='px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-mono rounded transition-colors cursor-pointer'>Format</button>
        <button onClick={minify} className='px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-mono rounded transition-colors cursor-pointer'>Minify</button>
        <button onClick={validateJSON} className='px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-emerald-200 text-sm font-mono rounded transition-colors cursor-pointer'>Validate</button>
        { output && (
          <button onClick={copy} className='ml-auto px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-mono rounded transition-colors'>{copied ? "Copied!" : "Copy" }</button>
        )}
      </div>

      <div className='flex flex-1 divide-x divide-gray-800 overflow-hidden min-w-0'>
        <div className='flex flex-col flex-1'>
          <div className='px-4 py-2 text-xs font-mono text-gray-500 bg-gray-900 border-b border-gray-800'>
            INPUT
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Paste JSON here...' className='flex-1 bg-gray-950 text-gray-300 font-mono text-sm p-4 resize-none outline-none placeholder-gray-700' spellCheck={false} />
        </div>

        <div className='flex flex-col flex-1 min-w-0'>
          <div className='px-4 py-2 text-xs font-mono text-gray-500 bg-gray-900 border-b border-gray-800'>
            OUTPUT
          </div>
          {error ? (
            <div className='p-5 text-rose-400 font-mono text-sm'>
             ✖ {error}
            </div>
          ) : (
            <pre className='flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed break-all whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: highlight(output) }}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
