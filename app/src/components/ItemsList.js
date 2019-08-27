import { connect } from "react-redux";
import React, { Component } from "react";
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as utterAction from "../actions/uttersAction";

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const style = {
  list_container: {
    paddingLeft: "24px"
  },
  filter_items_container: {
    padding: "12px 8px"
  },
  items_list: {
    // marginLeft: "2vw",
    height: "64.8vh",
    overflowY: "auto"
  },
  field_form: {
    // width: "90%",
    // margin: "2vh"
  }
}

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { filtered_items: [] };
  }

  itemsList() {
    const items = (this.state.filtered_items.length !== 0) ? this.state.filtered_items : this.props.items;

    if (items !== undefined) {
      return items.map((item, index) => (
        <ListItem
          tabIndex="-1"
          id={"items_list_" + index}
          button key={"items_list" + index}
          selected={(this.props.selected_item) === index}
          onClick={() => this.handleListItemClick(item, index)}>
          <ListItemIcon>{this.props.icon}</ListItemIcon>
          <ListItemText>
            <Typography noWrap>
              {item.nameUtter}
            </Typography>
          </ListItemText>
        </ListItem>
      ));
    }
  }

  filterItems(value) {
    this.setState({
      filtered_items: this.props.items.filter((item) => item.nameUtter.includes(value))
    });
  }

  handleListItemClick(item, index) {
    this.props.selectItem(item, index);
  }

  render() {
    return (
      <div>
        <div style={style.list_container} id="arroz">
          <Typography variant="h6" color="primary">
            {this.props.text}
          </Typography>

          <List style={style.items_list}>
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
  selectItem: (items, item_index) => dispatch(utterAction.selectItem(items, item_index))
});

export default connect(null, mapDispatchToProps)(ItemsList);
