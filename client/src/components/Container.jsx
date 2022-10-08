import React from 'react'
import styled, {useTheme} from 'styled-components'

const StyledContainer = styled.div`

  position: absolute;
  top: 7.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 15rem;
  max-width: 20rem;
  height: 80%;
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

`

function Container() {

  const theme = useTheme()

  return (
    <StyledContainer>
      <div className='heading'>
        <h2>TODO</h2>
        <img src={theme.name === 'dark' ? '/icon-sun.svg' : '/icon-moon.svg'} alt='theme-icon' />
      </div>
    </StyledContainer>
  )
}

export default Container
