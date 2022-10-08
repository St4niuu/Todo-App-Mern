import React from 'react'
import ReactDOM from 'react-dom/client'
import 'vite/modulepreload-polyfill'

function App() {
  return(
    <>
      <h1>App</h1>
    </>
  )
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />)