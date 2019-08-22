import styled from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add'

export const SaveButtonCheck = styled.div`
    width: 112px;
    height: 36px;
    display: flex;
    top: 0px;
    justify-content: center;
    align-items: center;
    label {
        font-family: Roboto;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.5px;
      }
    `
export const Done = styled(DoneIcon)`
    height: 55px;
    width: 55px;
`

export const CreateNewUtter = styled.div`
    width: 130px;
    height: 36px;
    display: flex;
    top: 0px;
    justify-content: center;
    align-items: center;
    label {
        font-family: Roboto;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
      }
    `
export const Add = styled(AddIcon)`
    height: 55px;
    width: 55px;
    margin-left: -10px;
`