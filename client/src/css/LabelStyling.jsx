import {css} from 'styled-components'

// Label styling

const LabelStyling = css`

  > input[type='checkbox'] {
    display: none;
  }
  > label {
    padding: 0.8rem;
    border-radius: 50%;
    border: 1px solid ${props => {return props.theme.labelBorder}};
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

`

export default LabelStyling