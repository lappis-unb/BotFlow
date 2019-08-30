import { connect } from "react-redux";
import React, { Component } from "react";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';
import { selectItem } from "../actions/uttersAction";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
    height: "64.8vh",
    overflowY: "auto"
  },
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
          id={"items_list_" + index}
          button key={"items_list" + index}
          selected={(this.props.selected_item_position) === index}
          onClick={() => this.handleListItemClick(item, index)}>
            <ListItemIcon>
              {this.props.icon}
            </ListItemIcon>
            <ListItemText>
              <Typography noWrap>
                {item.nameUtter}
              </Typography>
            </ListItemText>
        </ListItem>
      ));
    }
  }

  filterItems(wanted_name) {
    this.setState({
      filtered_items: this.props.items.filter((item) => item.nameUtter.includes(wanted_name))
    });
  }

  handleListItemClick(item, index) {
    this.props.selectItem(item, index, this.props.items);
  }

  render() {
    return (
      <div>
        <div style={style.list_container}>
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
  selectItem: (item, item_index, items) => dispatch(selectItem(item, item_index, items))
});

export default connect(null, mapDispatchToProps)(ItemsList);
