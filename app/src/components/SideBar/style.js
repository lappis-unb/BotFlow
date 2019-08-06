import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { Drawer } from '@material-ui/core'
import { List } from '@material-ui/core';

export const SideNav = styled(Drawer)`
width: 25%
`
export const Itens = styled(List)`
margin-top: 30% !important;
`
export const Add = styled(Button)`
padding-right: 6px;
padding-top: 6px;
padding-left: 6px;
left: 1%;
top: 1px;
width: 200px;
height: 35px;
`