import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ItemsList from "./ItemsList";

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const style = {
  list_container: {
    paddingLeft: "24px"
  },
  filter_items_container: {
    padding: "12px 8px"
  }
}

export default class ListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  filterItems() {
    return this.props.items.filter(item => (item.name).includes(this.state.value));
  }

  handleListItemClick(item, index) {
    this.props.selectItem(item, index, this.props.items);
  }

  handleFilterClick() {
    this.setState({ value: "" });
    this.filterItems();
  }

  handleFilterInput(e) {
    this.setState({ value: e.target.value });
    this.filterItems();
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
    return (
      <div>
        <div style={style.list_container}>
          <Typography variant="body2" color="primary">
            {this.props.text}
          </Typography>

          <ItemsList
            icon={this.props.icon}
            value={this.state.value}
            items={this.filterItems()}
            actionOnClick={this.props.actionOnClick}
            selected_item_position={this.props.selected_item_position} />
        </div>
        
        <Divider />

        <div style={style.filter_items_container}>
          <TextField
            fullWidth
            type="text"
            label="Filtrar"
            variant="outlined"
            value={this.state.value}
            style={style.field_form}
            onChange={(e) => this.handleFilterInput(e)}
            InputProps={{ endAdornment: this.getFilterIcon() }}
          />
        </div>
      </div>
    )
  }
}