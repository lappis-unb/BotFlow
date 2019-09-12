import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./ducks/index";

import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#dae8ea",
      default: "#fcfcfc"
    },
    primary: {
      light: "#f6f9f9",
      main: "#4b3953",
      contrastText: "#fff"
    },
    secondary: {
      light: "#fef4f3",
      main: "#f15035",
      contrastText: "#fff"
    },
    error: {
      main: "#AF0C00",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    h4: {
      fontStyle: 'Roboto-Regular',
      fontSize: 34,
      color: '#000000'
    },
    h5: {
      fontStyle: 'Roboto-Regular',
      fontSize: 24,
      color: '#000000'
    },
    h6: {
      fontStyle: 'Roboto-Regular',
      fontSize: 14,
      color: '#000000',
      fontWeight: 'normal',
      fontStretch: 'normal',
    },
    AppbarMenuActive: {
      fontStyle: 'Roboto-Bold-Italic',
      fontSize: 16,
      color: '#f15035'
    },
    AppbarMenuHover: {
      fontStyle: 'Roboto-Bold-Italic',
      fontSize: 16,
      color: '#dae8ea'
    },
    AppbarMenuIdle: {
      fontStyle: 'Roboto-Regular-Italic',
      fontSize: 16,
      color: '#dae8ea'
    },
    body1Dark: {
      fontStyle: 'Roboto-Regular',
      fontSize: 16,
      color: '#000000'
    },
    body1Light: {
      fontStyle: 'Roboto-Regular',
      fontSize: 16,
      color: '#ffffff'
    },
    buttonAccent: {
      fontStyle: 'Roboto-Medium',
      fontSize: 14,
      color: '#f15035'
    },
    buttonDarkCenter: {
      fontStyle: 'Roboto-Medium',
      fontSize: 14,
      color: '#ffffff'
    },
    buttonDarkLeft: {
      fontStyle: 'Roboto-Medium',
      fontSize: 14,
      color: '#000000'
    },
    buttonLightLeft: {
      fontStyle: 'Roboto-Medium',
      fontSize: 14,
      color: '#ffffff'
    },
    body2Accent: {
      fontStyle: 'Roboto-Regular',
      fontSize: 14,
      color: '#f15035'
    },
    body2Dark: {
      fontStyle: 'Roboto-Regular',
      fontSize: 14,
      color: '#000000'
    },
    body2Light: {
      fontStyle: 'Roboto-Regular',
      fontSize: 14,
      color: '#ffffff'
    },
    Subheader: {
      fontStyle: 'Roboto-Regular',
      fontSize: 14,
      color: '#4b3953'
    },
    Caption: {
      fontStyle: 'Roboto-Regular',
      fontSize: 12,
      color: '#000000'
    }
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
