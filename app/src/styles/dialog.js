import styled from 'styled-components';


export const DialogBox = styled.div`
margin-top: 30px;
// width: 260px;
background: #fef4f3;
padding: 5px;
text-align: center;
font-weight: 500;
color: #000;
border-radius: 10px;
font-family: italic;
position:relative;
height: 70px;
max-height:200px;
box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 15px 
:before {
  content: "";
  position: absolute;
  // box-shadow: rgba(0.0, 0.0, 0.0, 0.0) 2px 2px 100px ;
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
    width: 80%;
    margin-left: 10px;
    text-align: center;
    height: 50px;
    background: inherit;
    // margin: 0;
    padding: 0;
    border: none;
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