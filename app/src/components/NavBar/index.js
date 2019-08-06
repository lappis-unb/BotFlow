import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import createHistory from 'history/createBrowserHistory'
import { FirstButton, useStyles } from './style';
export const history = createHistory()



function changePage(path){
    history.push(path);
    
}

export default function NavBar() {
        const classes = useStyles();
        return(
            <AppBar position = "absolute" className = { classes.appBar } >
                <Toolbar>
                    <Typography variant="h6">
                        BotFlow
                    </Typography>
                    <FirstButton onClick={() => changePage("/stories")} color='inherit'>Diálogos</FirstButton>
                    <Button onClick={() => changePage("/utters")} color='inherit'>Respostas</Button>
                    <Button onClick={() => changePage("/intents")} color='inherit'>Perguntas</Button>
                    <Button onClick={() => changePage("/testing")} color='inherit'>Testar</Button>
                </Toolbar>
            </AppBar>
        )
    
}