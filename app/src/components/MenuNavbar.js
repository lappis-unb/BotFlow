import React from 'react';
import { Link } from 'react-router-dom';
import StoryIcon from '../icons/StoryIcon';
import UtterIcon from '../icons/UtterIcon';
import IntentIcon from '../icons/IntentIcon';
import { Tab, Tabs } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import AppIcon from '../icons/AppIcon';
import Button from '@material-ui/core/Button';
import { message } from '../utils/messages.js';
import { AppBar, Toolbar } from '@material-ui/core';
import { DOWNLOAD_URL} from '../utils/url_routes.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 2,
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

const StyledTab = withStyles(theme => ({
  root: {
    fontStyle: "italic",
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.primary.light,
    '& svg': {
      display: "none",
    },
    '&$selected': {
      fontWeight: theme.typography.fontWeightMedium,
      '& svg': {
        display: "inline",
        fill: theme.palette.primary.light,
      },
    },
  },
  selected: {},
  wrapper: {},
}))(props => <Tab {...props} />);


export default function MenuNavbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(handleChange());

  function handleChange(event, newValue) {
    const url = window.location.pathname;
    if (newValue !== undefined) {
      setValue(newValue)
    } else {
      if (url === '/' || url.includes('/stories/')) {
        return 0;
      } else if (url.includes('/intents/')) {
        return 1;
      } else if (url.includes('/utters/')) {
        return 2;
      }
    }
  }

  return (
      <AppBar id="app-bar-menu">
        <Toolbar>
          <Link onClick={() => handleChange(undefined, 0)} to="/">
            <AppIcon />
          </Link>
            <Tabs className={classes.root}
              value={value}
              onChange={handleChange}
              centered>
              <StyledTab classes={{ wrapper: classes.tabWrapper }} icon={<StoryIcon />} label="Diálogos" to="/" component={Link} />
              <StyledTab classes={{ wrapper: classes.tabWrapper }} icon={<IntentIcon />} label="Perguntas" to="/intents/new" component={Link} />
              <StyledTab classes={{ wrapper: classes.tabWrapper }} icon={<UtterIcon />} label="Respostas" to="/utters/new" component={Link} />
            </Tabs>
          <Button
            color="secondary"
            variant="contained"
            href={DOWNLOAD_URL}>
            {message.download} 
          </Button>
        </Toolbar>
      </AppBar>
  );
}
