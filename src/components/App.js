import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

const App = () => {
  const [html, setHtml] = useLocalStorage('html', '<h1>Hello world</h1>')
  const [css, setCss] = useLocalStorage('css',
    `body {
      background - color: #33373F;
    }`
  )
  const [js, setJs] = useLocalStorage('js', `document.body.style.color = '#61DAFB'`)
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 500)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          name="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          name="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          name="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
