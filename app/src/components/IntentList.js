import React, { Component } from "react";
import { connect } from "react-redux";
import * as intentAction from "../actions/intentsAction";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {
  List, ListItem,
} from '@material-ui/core';
import './ItemList.css'

class IntentList extends Component {
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
                selected={this.props.current_intent._id === item._id}>
                {this.truncateText(item.nameIntent)}
              </ListItem>
            ))
          }
        </List>

      )
    }
  }

  filterItems(value) {
    this.setState({
      filtered_items: this.props.items.filter((item) => item.nameIntent.includes(value))
    });
  }

  truncateText(text) {
    if (text.length > 20) {
        return text.substring(0, 17) + "..."
    }
    return text
  }

  render() {
    return (
      <div>
        <h6>{this.props.text}</h6>
        <ul className="List" >{this.itemsList()}</ul>

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
  selectItem: (items, intent_id) => dispatch(intentAction.selectItem(items, intent_id))
});

export default connect(null, mapDispatchToProps)(IntentList);
