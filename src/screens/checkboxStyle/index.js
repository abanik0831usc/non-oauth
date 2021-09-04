import styled from "styled-components";

export const ContainerLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: ${({fontSize = '22px' }) => fontSize};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover input ~ .checkmark {
    border: ${({theme}) => `1px solid ${theme}`};

  }

  &:hover input:checked ~ .checkmark {
    //background-color: #2196F3;
  }

  .checkmark:after {
    left: ${({left = '8px' }) => left};
    top: ${({top = '4px' }) => top};
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const ContainerInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  
  &:checked ~ .checkmark {
    background-color: ${({theme}) => `${theme}`};
  }
  
  &:checked ~ .checkmark:after {
    display: block;
  }
`

export const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({height = '25px' }) => height};
  width: ${({width = '25px' }) => width};
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgb(57, 58, 61);
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`