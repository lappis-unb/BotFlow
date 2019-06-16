import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Drawer } from '@material-ui/core'

export const Navbar = styled(Drawer)`
width: 25%
`

export const UtterName = styled(TextField)`
background: white;
color: white;
left: 240px;
top: -120px;
height: 60px;
width: 225px;
border-width: 20px;
`

export const Save = styled(Button)`
background-color: 1E90FF;
color: white;
left: 1200px;
top: -100px;
height: 47px;
width: 92px;
`