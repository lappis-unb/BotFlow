import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'


export const DialogBox = styled.div`
left: -250px;
top: 20px;
width: 350px;
margin: 50px auto;
background: #F2F2F2;
padding: 5px;
text-align: center;
font-weight: 500;
color: #000;
border-radius: 10px;
font-family: italic;
position:relative;
height:auto;
max-height:200px;
box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 15px 
:before {
  content: "";
  position: absolute;
  box-shadow: rgba(0.0, 0.0, 0.0, 0.0) 2px 2px 100px ;
  -moz-transform: rotate(280deg);
  -webkit-transform: rotate(285deg);
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
export const Add = styled(Button)`
padding-right: 6px;
padding-top: 6px;
padding-left: 6px;
left: 330px;
top: 1px;
margin-left: 0px;
width: 357px;
height: 42px;
`
export const Delete = styled(DeleteIcon)`
  color: #4F4F4F;
  margin-left: 13em;
`