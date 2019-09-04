import { connect } from "react-redux";
import React, { Component } from "react";
import { selectItem } from "../actions/itemsAction";

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

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


class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered_items: this.props.items,
      value: ""
    };
  }

  itemsList() {
    let filtered_items = this.filterItems();

    if (filtered_items.length !== 0) {
      return filtered_items.map((item, index) => (
        <StyledListItem
          button
          id={"items_list_" + index}
          key={"items_list" + index}
          selected={(this.props.selected_item_position) === index}
          onClick={() => this.handleListItemClick(item, index)}>
          <ListItemIcon>{this.props.icon}</ListItemIcon>
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
    let texts = name.replace(this.state.value, " " + this.state.value + " ").split(" ");

    return texts.map((text, index) => (
      (text === this.state.value) ? <span key={index + "filter_text"} style={{ color: "#f15035" }}>{text}</span> : text
    ));
  }

  filterItems() {
    return this.props.items.filter(item => (item.name).includes(this.state.value));
  }

  handleListItemClick(item, index) {
    this.props.selectItem(item, index, this.props.items);
  }

  handleFilterClick() {
    this.setState({ value: "" });
    this.filterItems("");
  }

  handleFilterInput(e) {
    this.setState({ value: e.target.value });
    this.filterItems(e.target.value);
  }

  getFilterIcon() {
    if ((this.state.value).trim().length === 0) {
      return <SearchIcon />
    } else {
      return (
        <CloseIcon
          onClick={() => this.handleFilterClick()}
          style={{ cursor: "pointer" }}
        />
      )
    }
  }

  render() {
    // const filtered_items = this.filterItems();
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
            // error={filtered_items.length === 0}
            value={this.state.value}
            style={style.field_form}
            InputProps={{ endAdornment: this.getFilterIcon() }}
            onChange={(e) => this.handleFilterInput(e)}
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
