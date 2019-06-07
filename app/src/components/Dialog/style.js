import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete';

export const DialogBox = styled.div`
width: 300px;
margin: 50px auto;
background: #F2F2F2;
padding: 10px;
text-align: center;
font-weight: 800;
color: #000;
border-radius: 10px;
font-family: arial;
position:relative;
height:auto;
max-height:200px;
box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 2px 
:before {
  content: "";
  position: absolute;
  box-shadow: rgba(0.0, 0.0, 0.0, 0.0) 2px 2px 1px ;
  -moz-transform: rotate(280deg);
  -webkit-transform: rotate(280deg);
  left: -30px;
  top: 20px;
  border-width: 20px;
  border-style: solid;
  border-color: transparent #F2F2F2 #F2F2F2 transparent;
}
textarea {
    width: inherit;
    text-align: center;
    height: 100px;
    background: inherit;
    margin: 0;
    padding: 0;
    border: none;
    resize: none;
    overflow: auto
}
`
export const Delete = styled(DeleteIcon)`
  color: #4F4F4F;
  padding-left: 11em;
`