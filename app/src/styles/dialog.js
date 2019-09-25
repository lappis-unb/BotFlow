import styled from 'styled-components';


export const DialogBoxPrimary = styled.div`
    position:relative;
    margin-top: 24px;
    background: #FDE9E6;
    border-radius: 8px;
    padding: 8px 16px;
    filter: drop-shadow(0 4px 4px rgba(78, 78, 78, 0.2));
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
        line-height: 1.5rem;
    }
`

export const DialogBoxSecondary = styled.div`
    position:relative;
    margin-top:-12px;
    background: #FDE9E6;
    border-radius: 8px;
    padding: 8px 16px;
    filter: drop-shadow(0 4px 4px rgba(78, 78, 78, 0.2));
    overflow: none;
  

  textarea {
    line-height: 1.5rem;
  }

`


export const NewPrimaryDialog = styled.div`
    margin-top: 24px;
    background: #FDE9E6;
    border-radius: 8px;
    padding: 20px 16px;
    color:#AAA;
    opacity: 0.6;
    cursor: pointer;
    filter: drop-shadow(0px 2px 0px rgba(241, 80, 53, 0.3));
    
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
`


export const NewSecondaryDialog = styled.div`
    margin-top: -12px;
    background: #FDE9E6;
    border-radius: 8px;
    padding: 20px 16px;
    color:#AAA;
    opacity: 0.6;
    cursor: pointer;
    filter: drop-shadow(0px 2px 0px rgba(241, 80, 53, 0.3));
`