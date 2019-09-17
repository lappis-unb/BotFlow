import React, { Component } from "react";

import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';
import { message } from "../utils/messages";

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
            {this.setHighlight(item.name, highlighted_text)}
          </Typography>
        </ListItemText>
      </StyledListItem>
    ));

    return new_items;
  }

  // TODO improve this
  setHighlight(name, highlighted_text) {
    let texts = name.replace(highlighted_text, " " + highlighted_text + " ").split(" ");

    return texts.map((text, index) => (
      (text === highlighted_text) ? <span key={index + "filter_text"} style={{ color: "#f15035" }}>{text}</span> : text
    ));
  }

  handleListItemClick(item, index) {
    this.props.actionOnClick(item, index);
  }

  getErrorMessage() {
    return (
      <Typography>{message.no_result}</Typography>
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
