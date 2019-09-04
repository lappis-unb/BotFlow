import styled from 'styled-components';


export const DialogBox = styled.div`
  position:relative;
    margin-top: 12px
    background: #FDE9E6;
    border-radius: 8px;
    padding: 8px 0;
    filter: drop-shadow(0 8px 6px rgba(78, 78, 78, 0.16));
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
    background: #FDE9E6;
    clip-path: polygon(22% 0, 25% 2%, 27% 4%, 100% 69%, 0 99%, 0 0);
  }



  textarea {
    background: inherit;
    width: calc(100% - 28px);
    border: none;
    margin: 6px;
    padding: 4px;
    resize: none;
    overflow: auto;
    display: block;
    //Typography body2Dark
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 0.8rem;
    line-height: 1.2rem
    color: #000;  
  }

  textarea:focus {
      outline: none;
      border-style: none;
      border-color: transparent;
      overflow: auto;
  }
`