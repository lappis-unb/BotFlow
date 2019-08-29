import styled from 'styled-components';


export const DialogBox = styled.div`
position:relative;
  margin-top: 80px;
  background: #fef4f3;
  border-radius: 8px;
  padding: 8px 0;
  filter: drop-shadow(0 8px 12px rgba(78, 78, 78, 0.16));
  overflow: none;

:after {
  content: "";
  position: absolute;               
  left: 0px;
  top: -19px;     
  width: 40px;
  height: 32px;
  border: inherit;
  border-radius: inherit;
  background: #fef4f3;
  clip-path: polygon(22% 0, 25% 2%, 27% 4%, 100% 69%, 0 99%, 0 0);
}



textarea {
  background: inherit;
  width: calc(100% - 20px);
  border: none;
  margin: 10px;
  padding: 4px;
  resize: none;
  overflow: auto;
  display: block;
}

textarea:focus {
    outline: none;
    border-style: none;
    border-color: transparent;
    overflow: auto;
}
`