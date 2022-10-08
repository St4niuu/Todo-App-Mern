import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import 'vite/modulepreload-polyfill'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import Container from './components/Container'

const themes = [{
    name: 'dark',
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
    name: 'light',
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
    font-size: 18px;
    font-weight: 400;
    > #root {
      display: flex;
      flex-direction: column;
      position: relative;
      > div:nth-of-type(1) {
        width: 100%;
        height: 30%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: 
          ${props => {
            switch(props.theme.name) {
              case 'dark': return `url('/bg-mobile-dark.jpg');`
              case 'light': return `url('/bg-mobile-light.jpg');`
            } 
          }}
        @media (min-width: 420px) {
          background-image: 
            ${props => {
              switch(props.theme.name) {
                case 'dark': return `url('/bg-desktop-dark.jpg');`
                case 'light': return `url('/bg-desktop-light.jpg');`
              } 
            }}
        }
      }
      > div:nth-of-type(2) {
        width: 100%;
        height: 70%;
        background-color: ${props => {return props.theme.mainBackground}};
      }
    }
  }

`

function App() {

  const [theme, setTheme] = useState(0)

  return(
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <div></div>
      <div></div>
      <Container />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />)