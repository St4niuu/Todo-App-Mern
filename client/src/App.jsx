import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import 'vite/modulepreload-polyfill'
import {createGlobalStyle, ThemeProvider} from 'styled-components'

const themes = [{
    pickedFilter: 'hsl(220, 98%, 61%)',
    checkBackground: 'linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)',
    mainBackground: 'hsl(235, 21%, 11%)',
    containerBackground: 'hsl(235, 24%, 19%)',
    todoUndone: 'white',
    todoDone: 'hsl(233, 14%, 35%)',
    functions: 'hsl(234, 11%, 52%)',
    filters: 'hsl(234, 39%, 85%)',
  },
  {
    pickedFilter: 'hsl(220, 98%, 61%)',
    checkBackground: 'linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)',
    mainBackground: 'hsl(0, 0%, 98%)',
    containerBackground: 'white',
    todoUndone: 'hsl(236, 33%, 92%)',
    todoDone: 'hsl(235, 19%, 35%)',
    functions: 'hsl(233, 11%, 84%)',
    filters: 'hsl(236, 9%, 61%)'
  }
]

const GlobalStyle = createGlobalStyle`

  *::before, *::after, * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
  }
  body {
    font-family: 'Josefin Sans', sans-serif;
  }

`

function App() {

  const [theme, setTheme] = useState(0)

  return(
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      Hello
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />)