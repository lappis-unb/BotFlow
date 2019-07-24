import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Message from '@material-ui/icons/Message';
import Info from '@material-ui/icons/Info';


export const UtterName = styled(TextField)`
background: white;
color: white;
left:20px;
top: 30px;
height: 60px;
width: 225px;
border-width: 20px;
`

export const Save = styled(Button)`
background-color: #1E90FF;
color: white;
left: 1000px;
top: -20px;
height: 47px;
width: 92px;
`

export const IconMessage = styled(Message)`
left: 1000px;
top: 40px;
height: 55px;
width: 55px;
`
export const IconInfo = styled(Info)`
left: 1000px;
top: 40px;
height: 55px;
width: 55px;
`