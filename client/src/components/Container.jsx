import React, {useEffect, useRef, useState} from 'react'
import styled, {useTheme} from 'styled-components'
import handleKeyPress from '../hooks/handleKeyPress'
import LabelStyling from '../css/LabelStyling'
import FiltersStyling from '../css/FiltersStyling'
import Todo from './Todo'
import {v4} from 'uuid'
import axios from 'axios'

// Styling container

const StyledContainer = styled.div`

  position: absolute;
  top: 2.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 15rem;
  max-width: 20rem;
  height: 97.5%;
  min-height: 40rem;
  max-height: 45rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0rem;
  @media (min-width: 420px) {
    min-width: 25rem;
    max-width: 35rem;
    min-height: 45rem;
    max-height: 55rem;
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
    ${() => {return LabelStyling}}
  }
  > .content {
    width: 100%;
    height: calc(67.5% - 4rem);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: ${props => {return props.theme.containerBackground}};
    box-shadow: 0 1px 12px 0 black;
    > .todos {
      width: 100%;
      height: 88%;
      overflow-y: scroll;
    }
    > .functions {
      height: 12%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      align-items: center;
      font-size: 80%;
      color: ${props => {return props.theme.functions}};
      > .functions-left {
        font-weight: 700;
      }
      > .functions-filters-desktop {
        ${() => {return FiltersStyling}}
        display: none;
        @media (min-width: 420px) {
          display: flex;
        }
      }
      > .functions-clear {
        cursor: pointer;
      }
    }
  }
  > .filters-phone {
    width: 100%;
    height: 10%;
    border-radius: 5px;
    padding: 1rem;
    background-color: ${props => {return props.theme.containerBackground}};
    box-shadow: 0 1px 12px 0 black;
    ${() => {return FiltersStyling}}
    @media (min-width: 420px) {
      display: none;
    }
  }
  > .notice {
    width: 100%;
    height: 2.5%;
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

    // Filters

    const [filter, setFilter] = useState(1)
    const [todosToView, setTodosToView] = useState([])

    useEffect(() => {
      const setContent = async () => {
        await setTodosToView(todos)
      }
      setContent()
    }, [todos])

    useEffect(() => {
      const setContent = async () => {
        switch(filter) {
          case 1:
            return await setTodosToView(todos)
          case 2:
            return await setTodosToView(todos.filter(item => {return item.isDone === false}))
          case 3:
            return await setTodosToView(todos.filter(item => {return item.isDone === true}))
        }
      }
      setContent()
    }, [filter])

    // Maintaining user ID

    useEffect(() => {
      if(window.localStorage.getItem('USER_ID')) return
      else (window.localStorage.setItem('USER_ID', v4()))
    }, [])
  
    // Adding a todo

    const inputIsDone = useRef()
    const inputContent = useRef()

    async function addTodo() {
      if(inputContent.current.value !== '') {
        const todoToSet = {id: v4(), userID: window.localStorage.getItem('USER_ID'), content: inputContent.current.value, isDone: inputIsDone.current.checked}
        await axios.post('/api/add-todo', todoToSet)
        await setTodos(prev => {return [...prev, todoToSet]})
        inputIsDone.current.checked = false
        inputContent.current.value = ''
      }
    }

    handleKeyPress(addTodo, 'Enter')

    // Modifying a todo

    async function modifyTodo(id) {
      await axios.put('/api/modify-todo', {id: id, isDone: !todos.find(item => {return item.id === id}).isDone})
      await setTodos(prev => {
        return prev.map(item => {
          if(item.id === id) return {...item, isDone: !item.isDone}
          else return ({...item})
        })
      })
      
    }

    // Deleting a todo

    async function deleteTodo(id) {
      await setTodos(prev => {
        return prev.filter(item => {return item.id !== id})
      })
      await axios.delete('/api/delete-todo', {headers: {id: id}})
    }

    // Clearing done 
    async function clearTodo() {
      await axios.delete('/api/clear-todo')
      await setTodos(prev => {
        return prev.filter(item => {return item.isDone === false})
      })
    }

  // Fetching the theme

  const theme = useTheme()

  return (
    <StyledContainer filter={filter}>
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
        <div className='todos'>
          {todosToView.map(item => {return <Todo key={item.id} id={item.id} content={item.content} isDone={item.isDone} modifyTodo={modifyTodo} deleteTodo={deleteTodo} />})}
        </div>
        <div className='functions'>
          <div className='functions-left'>
            {todos.filter(item => {return item.isDone === false}).length} items left
          </div>
          <div className='functions-filters-desktop'>
            <span onClick={() => {setFilter(1)}}>All</span>
            <span onClick={() => {setFilter(2)}}>Active</span>
            <span onClick={() => {setFilter(3)}}>Completed</span>
          </div>
          <div className='functions-clear' onClick={() => {clearTodo()}}>
            Clear completed
          </div>
        </div>
      </div>
      <div className='filters-phone'>
        <span onClick={() => {setFilter(1)}}>All</span>
        <span onClick={() => {setFilter(2)}}>Active</span>
        <span onClick={() => {setFilter(3)}}>Completed</span>
      </div>
      <div className='notice'>
        Drag and drop to reorder the list
      </div>
    </StyledContainer>
  )
}

export default Container
