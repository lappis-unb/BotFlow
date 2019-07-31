import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import createHistory from 'history/createBrowserHistory'
export const history = createHistory()

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    appBar:{
        zIndex: theme.zIndex.drawer + 1
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function changePage(path){
    history.push(path);
    window.location.reload();
}

export default function NavBar() {
        const classes = useStyles();
        return(
            <AppBar position = "absolute" className = { classes.appBar } >
                <Toolbar>
                    <Typography variant="h6">
                        BotFlow
                    </Typography>
                    <Button onClick={() => changePage("/stories")} style={{marginLeft: '10%'}} color='inherit'>Diálogos</Button>
                    <Button onClick={() => changePage("/utters")} color='inherit'>Respostas</Button>
                    <Button onClick={() => changePage("/intents")} color='inherit'>Perguntas</Button>
                </Toolbar>
            </AppBar>
        )
    
}