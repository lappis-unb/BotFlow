import React, { Component } from "react";

import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';

const style = {
  list_container: {
    paddingLeft: "24px",
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

const getItemsList = (items, icon, highlighted_text, selected_item_position) => {
  const new_items = items.map((item, index) => (
    <StyledListItem
      button
      id={"items_list_" + index}
      key={"items_list" + index}
      selected={(selected_item_position) === index}
      onClick={() => handleListItemClick(item.id, index)}
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

// TODO improve this
const setHighlight = (name, highlighted_text) => {
  let texts = name.replace(highlighted_text, " " + highlighted_text + " ").split(" ");

  return texts.map((text, index) => (
    (text === highlighted_text) ? <span key={index + "filter_text"} style={{ color: "#f15035" }}>{text}</span> : text
  ));
}

const handleListItemClick = (item_id, index) => {
  this.props.actionOnClick(item_id, index);
}

const getErrorMessage = () => {
  return (
    <Typography>Nenhum resultado encontrado!</Typography>
  );
}

const itemsList = ({ items, icon, highlighted_text, selected_item_position }) => {
  return (
    <List style={style.list_container}>
      {(items.length !== 0 ? getItemsList(items, icon, highlighted_text, selected_item_position) : getErrorMessage())}
    </List>
  );
}

export default itemsList;
