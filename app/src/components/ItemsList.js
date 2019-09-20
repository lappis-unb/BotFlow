import React, { Component } from "react";

import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';
import { message } from "../utils/messages";
import { setHighlight } from "../utils/utils";

const StyledListItem = styled(ListItem)({
  backgroundColor: "transparent",
  borderRadius: "12px 0 0 12px",

  "&:hover": {
    backgroundColor: "rgba(246,249,249,0.6)", //primary.light $40%
  },
  "&.Mui-selected": {
    color: "#f15035", //secondary
    backgroundColor: "#f6f9f9", //primary.light
    "&:hover": {
      backgroundColor: "#f6f9f9" //primary.light
    }
  },
  "& .MuiListItemIcon-root": {
    fill: "#4b3953", //primary
    "&.Mui-selected": {
      fill: "#f15035", //secondary
    }
  },
  "&.Mui-selected .MuiListItemIcon-root": {
    fill: "#f15035", //secondary
  }
});

export default class ItemList extends Component {

  getItemsList(items, icon, highlighted_text, selected_item_position) {
    const new_items = items.map((item, index) => (
      <StyledListItem
        button
        id={"items_list_" + index}
        key={"items_list" + index}
        selected={(selected_item_position) === index}
        onClick={() => this.handleListItemClick(item, index)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <Typography noWrap>
            {setHighlight(item.name, highlighted_text)}
          </Typography>
        </ListItemText>
      </StyledListItem>
    ));

    return new_items;
  }

  handleListItemClick(item, index) {
    this.props.actionOnClick(item, index);
  }

  getErrorMessage() {
    return (
        <li style={{textAlign:'center', paddingTop:'10em'}}>
            <Typography variant="caption" color="secondary">{message.no_result}</Typography>
        </li>
    );
  }

  render() {
    return (
      <List>
        {(this.props.items.length !== 0 ? this.getItemsList(this.props.items, this.props.icon, this.props.highlighted_text, this.props.selected_item_position) : this.getErrorMessage())}
      </List>
    );
  }
}
