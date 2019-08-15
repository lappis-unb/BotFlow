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
    position: "relative",
    height: "calc(100% - 64px)"
  },
  filter_items_container: {
    bottom: 0,
    width: "100%",
    position: "absolute"
  },
  items_list: {
    marginLeft: "2vw"
  },
  field_form: {
    width: "90%",
    margin: "2vh"
  }
}

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { filtered_items: [], selected_item: 0 };
  }

  itemsList() {
    const items = (this.state.filtered_items.length !== 0) ? this.state.filtered_items : this.props.items;

    if (items !== undefined) {
      return items.map((item, index) => (
        <ListItem button key={"items_list" + index}
          selected={this.state.selected_item === index}
          onClick={() => this.handleListItemClick(item, index)}>
          <ListItemIcon>
            {this.props.icon}
          </ListItemIcon>
          <ListItemText primary={this.truncateText(item.nameUtter)} />
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
    this.setState({ selected_item: index });
    this.props.selectItem(item._id)
  }

  truncateText(text) {
    if (text.length > 20) {
        return text.substring(0, 17) + "..."
    }
    return text
  }

  render() {
    return (
      <div style={style.list_container}>
        <div style={style.items_list}>
          <Typography variant="h6" color="primary">
            {this.props.text}
          </Typography>
        
          <List>
            {this.itemsList()}
          </List>
        </div>

        <div style={style.filter_items_container}>
          <Divider />
        
          <TextField
            fullWidth
            type="text"
            label="Filtrar"
            variant="outlined"
            style={style.field_form}
            onChange={(e) => this.filterItems(e.target.value)}
            InputProps={{ endAdornment: (<SearchIcon />) }}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  selectItem: (items, utter_id) => dispatch(utterAction.selectItem(items, utter_id))
});

export default connect(null, mapDispatchToProps)(ItemsList);
