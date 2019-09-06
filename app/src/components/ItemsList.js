import React, { Component } from "react";

import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';
import IntentIcon from '../icons/IntentIcon';
import UtterIcon from '../icons/UtterIcon';

const style = {
  list_container: {
    paddingLeft: "24px"
  },
  items_list: {
    height: "64.8vh",
    overflowY: "auto"
  }
}

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


export default class Items extends Component {
  itemsList() {
    let filtered_items = this.props.items;

    if (filtered_items.length !== 0) {
      return filtered_items.map((item, index) => (
        <StyledListItem
          button
          id={"items_list_" + index}
          key={"items_list" + index}
          selected={(this.props.selected_item_position) === index}
          onClick={() => this.handleListItemClick(item, index)}>
          <ListItemIcon>{this.getIcon(isIntent)}</ListItemIcon>
          <ListItemText>
            <Typography noWrap>
              {this.setHighlight(item.name)}
            </Typography>
          </ListItemText>
        </StyledListItem>
      ));
    } else {
      return (
        <Typography style={{ marginTop: "15px" }} noWrap>
          Nenhum resultado encontrado!
        </Typography>
      )
    }
  }

  setHighlight(name) {
    let texts = name.replace(this.props.value, " " + this.props.value + " ").split(" ");

    return texts.map((text, index) => (
      (text === this.props.value) ? <span key={index + "filter_text"} style={{ color: "#f15035" }}>{text}</span> : text
    ));
  }

  handleListItemClick(item, index) {
    this.props.actionOnClick(item, index, this.props.items);
  }

  render() {
    return (
      <List dense={true} style={style.items_list}>
        <div style={style.list_container}>
          <Typography variant="body2" color="primary">
            {this.props.text}
          </Typography>
          <List dense={true} style={style.items_list}>
            {this.itemsList()}
          </List>
        </div>
      </List>
    )
  }
}