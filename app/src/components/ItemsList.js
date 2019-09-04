import { connect } from "react-redux";
import React, { Component } from "react";
import {selectItem} from "../actions/itemsAction";

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {List, ListItem, ListItemIcon, ListItemText, styled} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const style = {
  list_container: {
    paddingLeft: "24px"
  },
  filter_items_container: {
    padding: "12px 8px"
  },
  items_list: {
    height: "64.8vh",
    overflowY: "auto"
  }
}

const StyledListItem = styled(ListItem)({
  backgroundColor: "transparent",
  borderRadius:"12px 0 0 12px",

  "&:hover": {
      backgroundColor: "rgba(246,249,249,0.6)", //primary.light $40%
  },
  "&.Mui-selected": {
    color:"#f15035", //secondary
    backgroundColor: "#f6f9f9", //primary.light
    "&:hover": {
        backgroundColor: "#f6f9f9" //primary.light
    }
  },
  "& .MuiListItemIcon-root":{
    fill:"#4b3953", //primary
    "&.Mui-selected":{
      fill: "#f15035", //secondary
    }
  },
  "&.Mui-selected .MuiListItemIcon-root":{
      fill: "#f15035", //secondary
  }
});


class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { filtered_items: [] };
  }

  itemsList() {
    const items = (this.state.filtered_items.length !== 0) ? this.state.filtered_items : this.props.items;
    console.log("ITEMS", items)
    if (items !== undefined) {
      return items.map((item, index) => (
        <StyledListItem
          button
          id={"items_list_" + index}
          key={"items_list" + index}
          selected={(this.props.selected_item_position) === index}
          onClick={() => this.handleListItemClick(item, index)}>
          <ListItemIcon>{this.props.icon}</ListItemIcon>
          <ListItemText>
            <Typography noWrap>
              {item.name}
            </Typography>
          </ListItemText>
        </StyledListItem>
      ));
    }
  }

  filterItems(value) {
    this.setState({
      filtered_items: this.props.items.filter((item) => item.name.includes(value))
    });
  }

  handleListItemClick(item, index) {
    this.props.selectItem(item, index, this.props.items);
  }

  render() {
    return (
      <div>
        <div style={style.list_container}>
          <Typography variant="body2" color="primary">
            {this.props.text}
          </Typography>
          <List dense={true} style={style.items_list}>
            {this.itemsList()}
          </List>
        </div>
        <Divider />
        <div style={style.filter_items_container}>
          <TextField
            fullWidth
            type="text"
            label="Filtrar"
            variant="outlined"
            style={style.field_form}
            InputProps={{ endAdornment: (<SearchIcon />) }}
            onChange={(e) => this.filterItems(e.target.value)}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  selectItem: (item, item_index, items) => dispatch(selectItem(item, item_index, items))
});

export default connect(null, mapDispatchToProps)(ItemsList);
