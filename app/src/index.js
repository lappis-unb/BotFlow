import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./store/index";

import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { light } from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4b3953',
      light: '#dae8ea'
    },
    secondary: {
      main: '#f15035'
    },
  }
})

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();