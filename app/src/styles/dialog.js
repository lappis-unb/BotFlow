import styled from 'styled-components';


export const DialogBox = styled.div`
position:relative;
margin-top: 30px;
background: #fef4f3;
border-radius: 10px;
padding: 8px 0;
overflow: none;
box-shadow: rgba(78, 78, 78, 0.16) 0px 8px 16px
:before {
  content: "";
  position: absolute;
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  left: -0px;
  top: -25px;
  border-width: 20px;
  border-style: solid;
  border-color: transparent #fef4f3 #fef4f3 transparent;
  z-index: 90;
}
textarea {
  background: inherit;
  width: calc(100% - 20px);
  border: 1px solid red;
  margin: 10px;
  padding: 0;
  resize: none;
  overflow: auto;
}
textarea:focus{
    outline: none;
    border-style: none;
    border-color: transparent;
    overflow: auto;
}
`