import React, {useEffect, useRef, useState} from 'react'
import styled, {useTheme, css} from 'styled-components'
import handleKeyPress from '../hooks/handleKeyPress'
import LabelStyling from '../css/LabelStyling'
import {v4} from 'uuid'
import axios from 'axios'

// Styling container

const StyledContainer = styled.div`

  position: absolute;
  top: 7.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 15rem;
  max-width: 20rem;
  height: 90%;
  min-height: 30rem;
  max-height: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 420px) {
    min-width: 20rem;
    max-width: 35rem;
    min-height: 32.5rem;
    max-height: 40rem;
  }
  > .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
    color: white;
    > h2 {
      letter-spacing: .75rem;
    }
    > img {
      cursor: pointer;
    }
  }
  > .input {
    width: 100%;
    height: 10%;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    background-color: ${props => {return props.theme.containerBackground}};
    > input[type='text'] {
      flex-grow: 2;
      background-color: inherit;
      outline: none;
      border: none;
      font-weight: 700;
      color: ${props => {return props.theme.inputColor}};
      caret-color: grey;
    }
    ${LabelStyling}
  }
  > .content {
    width: 100%;
    height: 70%;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    background-color: ${props => {return props.theme.containerBackground}};
  }
  > .filters-phone {
    width: 100%;
    height: 10%;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    background-color: ${props => {return props.theme.containerBackground}};
  }
  > .notice {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 75%;
    color: ${props => {return props.theme.notice}};
  }

`

// Function that changes theme

function themeChange(...params) {
  switch(params[0]) {
    case 0:
      return params[1](1)
    case 1:
      return params[1](0)
  }
}

// Setting the container

function Container(props) {

  // Functionality

    // Setting todos

    const [todos, setTodos] = useState([])

    useEffect(() => {
      const getTodos = async () => {
        const todosToSet = await axios.get(`/${window.localStorage.getItem('USER_ID')}`)
        await setTodos(todosToSet.data)
      }
      getTodos()
    }, [])

    // Maintaining user ID

    useEffect(() => {
      if(window.localStorage.getItem('USER_ID')) return
      else (window.localStorage.setItem('USER_ID', v4()))
    }, [])
  
    // Add a todo

    const inputIsDone = useRef()
    const inputContent = useRef()

    async function addTodo() {
      const todoToSet = {id: v4(), userID: window.localStorage.getItem('USER_ID'), content: inputContent.current.value, isDone: inputIsDone.current.checked}
      await axios.post('/api/add-todo', todoToSet)
      await setTodos(prev => {return [...prev, todoToSet]})
      inputIsDone.current.checked = false
      inputContent.current.value = ''
    }

    handleKeyPress(addTodo, 'Enter')

  // Additional properties

  const theme = useTheme()

  return (
    <StyledContainer>
      <div className='heading'>
        <h2>TODO</h2>
        <img src={theme.name === 'dark' ? '/icon-sun.svg' : '/icon-moon.svg'} alt='theme-icon' onClick={() => themeChange(props.theme, props.setTheme)} 
        />
      </div>
      <div className='input'>
        <input type='checkbox' id='checkboxInput' ref={inputIsDone} />
        <label htmlFor='checkboxInput'></label>
        <input type='text' placeholder='Create a new todo...' ref={inputContent} />
      </div>
      <div className='content'>

      </div>
      <div className='filters-phone'>

      </div>
      <div className='notice'>
        Drag and drop to reorder the list
      </div>
    </StyledContainer>
  )
}

export default Container
