import React from 'react'
import styled from 'styled-components'
import LabelStyling from '../css/LabelStyling'

const StyledTodo = styled.div`

  width: 100%;
  height: calc(100%/6);
  position: relative;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 75%;
  color: ${props => {
    switch(props.isDone) {
      case true: return props.theme.todoDone
      case false: return props.theme.todoUndone
    }
  }};
  text-decoration: ${props => {
    switch(props.isDone) {
      case true: return `line-through`
      case false: return `none`
    }
  }};
  > .todo-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    ${() => {return LabelStyling}}
  }
  > img {
    cursor: pointer;
    @media (min-width: 420px) {
      display: none;
    }
  }
  @media (min-width: 420px) {
    &:hover > img {
      display: block;
    }
  }
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    top: calc(100% - 1px);
    left: 0;
    background-color: ${props => {return props.theme.todoLine}};
  }

`

function Todo(props) {
  return (
    <StyledTodo 
      isDone={props.isDone}
      draggable={true}
      onDragStart={() => {props.handleOnDragStart(props.id)}}
      onDragOver={(e) => {props.handleOnDragOver(e)}}
      onDrop={() => {props.handleOnDrop(props.id)}}
    >
      <div className='todo-content'>
        <input type='checkbox' id={props.id} checked={props.isDone} onChange={() => {props.modifyTodo(props.id)}} />
        <label htmlFor={props.id}></label>
        <div>{props.content}</div>
      </div>
      <img src='/icon-cross.svg' alt='todo-delete' onClick={() => {props.deleteTodo(props.id)}} />
    </StyledTodo>
  )
}

export default Todo
