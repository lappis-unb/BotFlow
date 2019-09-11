import styled from 'styled-components';

export const StoryBox = styled.div`
  position:relative;
    background: #f6f9f9;
    border-radius: 8px;
    padding: 8px 0;
    overflow: none;

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