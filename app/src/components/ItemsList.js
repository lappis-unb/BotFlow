import React, { Component } from "react";
import { connect } from "react-redux";
import * as utterAction from "../actions/uttersAction";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {
  List, ListItem,
} from '@material-ui/core';

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { filtered_items: [] };
  }

  itemsList() {
    const items = (this.state.filtered_items.length !== 0) ? this.state.filtered_items : this.props.items;

    if (items !== undefined) {
      return (
        <List>
          {
            items.map((item, index) => (
              <ListItem key={"items_list" + index}
                onClick={() => this.props.selectItem(item._id)}
                selected={this.props.current_utter._id === item._id}>
                {item.nameUtter}
              </ListItem>
            ))
          }
        </List>

      )
    }
  }

  filterItems(value) {
    this.setState({
      filtered_items: this.props.items.filter((item) => item.nameUtter.includes(value))
    });
  }

  render() {
    return (
      <div>
        <h6>{this.props.text}</h6>
        <ul>{this.itemsList()}</ul>

        <TextField
          id="outlined-search-field"
          type="text"
          variant="outlined"
          label="Filtrar"
          onChange={(e) => this.filterItems(e.target.value)}
          InputProps={{
            endAdornment: (
                <SearchIcon />
            ),
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  selectItem: (items, utter_id) => dispatch(utterAction.selectItem(items, utter_id))
});

export default connect(null, mapDispatchToProps)(ItemsList);
