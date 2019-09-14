import React, { Component } from "react";

import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const style = {
  list_container: {
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

export default class ItemList extends Component {


  getItemsList(items, icon, highlighted_text, selected_item_position) {
    const new_items = items.map((item, index) => {
      const labelId = `checkbox-list-label-${item.name}`;
      return (
        <StyledListItem
          button
          id={"items_list_" + index}
          key={"items_list" + index}
          selected={this.isSelected(item)}
          onClick={() => this.handleListItemClick(item, index)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <Typography noWrap>
              {this.setHighlight(item.name, highlighted_text)}
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={true}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
        </StyledListItem>
      )
    });

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
      <Typography>Nenhum resultado encontrado!</Typography>
    );
  }

  render() {
    return (
      <List style={style.list_container}>
        {(this.props.items.length !== 0 ? this.getItemsList(this.props.items, this.props.icon, this.props.highlighted_text, this.props.selected_item_position) : this.getErrorMessage())}
      </List>
    );
  }
}