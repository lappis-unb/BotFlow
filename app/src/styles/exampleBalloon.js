import styled from 'styled-components';


export const IntentBalloon = styled.div`
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
  align-self: stretch;
  background: #dae8ea;
  margin: 32px 16px 16px 36px;

  :after{
    content: "";
    position: absolute;               
    right: 0;
    bottom: -24px;     
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background: inherit;
    clip-path: polygon(100% 0, 100% 100%, 92% 100%, 82% 98%, 78% 92%, 0 0);
  }
`

export const UtterFirstBalloon = styled.div`
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
  align-self: stretch;
  background: #fde9e6;
  margin: 16px 36px 8px 16px;

  :after{
    content: "";
    position: absolute;               
    left: 0;
    top: -24px;     
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background: inherit;
    clip-path: polygon(18% 4%, 22% 8%, 26% 14%, 100% 100%, 0 100%, 0 0);
  }
`

export const UtterBalloon = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  align-self: stretch;
  background: #fde9e6;
  margin: 0 36px 8px 16px;
`