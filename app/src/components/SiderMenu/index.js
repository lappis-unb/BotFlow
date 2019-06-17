import React from 'react';
import {
  List, ListItem, ListItemText,
} from '@material-ui/core';
import { SideNav } from './style';

const SiderMenu = () => (
  <SideNav
    variant="permanent"
    anchor="left"
  >
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map(text => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </SideNav>
);
export default SiderMenu;
