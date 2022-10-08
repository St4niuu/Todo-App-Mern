import React from 'react'
import styled, {useTheme} from 'styled-components'

// Styling container

const StyledContainer = styled.div`

  position: absolute;
  top: 7.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 15rem;
  max-width: 20rem;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 420px) {
    min-width: 20rem;
    max-width: 35rem;
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
      color: ${props => {return props.theme.todoUndone}};
      caret-color: grey;
    }
    > input[type='checkbox'] {
      display: none;
    }
    > label {
      padding: 0.8rem;
      border-radius: 50%;
      border: 1px solid ${props => {return props.theme.todoDone}};
      &:hover {
        cursor: pointer;
        border: 3px solid transparent;
        margin: -2px;
        background: linear-gradient(${props => {return props.theme.containerBackground}}, ${props => {return props.theme.containerBackground}}) padding-box, ${props => {return props.theme.checkBackground}} border-box;
      }
    }
    > input[type='checkbox']:checked ~ label {
      background: url('/icon-check.svg') no-repeat 50% 50%, ${props => {return props.theme.checkBackground}} padding-box, ${props => {return props.theme.checkBackground}} border-box;
      border: 3px solid transparent;
      margin: -2px;
    }
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

  const theme = useTheme()

  return (
    <StyledContainer>
      <div className='heading'>
        <h2>TODO</h2>
        <img 
          src={theme.name === 'dark' ? '/icon-sun.svg' : '/icon-moon.svg'} 
          alt='theme-icon' 
          onClick={() => themeChange(props.theme, props.setTheme)} 
        />
      </div>
      <div className='input'>
        <input type='checkbox' id='checkboxInput' />
        <label htmlFor='checkboxInput'></label>
        <input type='text' placeholder='Create a new todo...' />
      </div>
    </StyledContainer>
  )
}

export default Container
