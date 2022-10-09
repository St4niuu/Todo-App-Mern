import {css} from 'styled-components'

const FiltersStyling = css`

  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  color: ${props => {return props.theme.filters}};
  font-size: 80%;
  font-weight: 700;
  > span {
    cursor: pointer;
  }
  > span:nth-of-type(${props => {return props.filter}}) {
    color: ${props => {return props.theme.pickedFilter}};
  }

`

export default FiltersStyling