import styled from 'styled-components'

export const DialogBox = styled.div`
width: 300px;
margin: 50px auto;
background: #F2F2F2;
padding: 20px;
text-align: center;
font-weight: 900;
color: #000;
font-family: arial;
position:relative;
height:auto;
max-height:200px;
box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 2px 
:before {
  content: "";
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 2px ;
  -moz-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  right: -8px;
  top: 10px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #F2F2F2 #F2F2F2 transparent;
}
textarea {
    width: inherit;
    height: 100px;
    background: inherit;
    margin: 0;
    padding: 0;
    border: none;
    resize: none;
    overflow: auto
}
`
