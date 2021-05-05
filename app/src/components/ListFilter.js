import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ItemsList from "./ItemsList";
import i18n from '../translate/i18n'

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const style = {
  filter_items_container: {
    padding: "12px 8px",
    //position: "relative",
    //background: "yellow",
    //bottom: 0
  },
  list_container: {
    height: "calc(100vh - 74px - 64px - 80px - 10px)",
    paddingLeft: "24px",
    overflowY: "auto"
  }
}

export default class ListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  filterItems(items) {
    if (items !== undefined) {
      return items.filter(item => (item.name).includes(this.state.value));
    }
    return [];
  }

  handleListItemClick(item, index) {
    this.props.selectItem(item, index, this.props.items);
  }

  handleFilterInput(e) {
    this.setState({ value: e.target.value });
  }

  getFilterIcon() {
    if ((this.state.value).trim().length === 0) {
      return <SearchIcon />
    }
    return (
      <CloseIcon
        onClick={() => this.cleanFilter()}
        style={{ cursor: "pointer" }}
      />
    )
  }

  cleanFilter() {
    this.setState({ value: "" });
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
            highlighted_text={this.state.value}
            actionOnClick={this.props.actionOnClick}
            items={this.filterItems(this.props.items)}
            selected_item_position={this.props.selected_item_position}
          />
        </div>
        <Divider />
        <div style={style.filter_items_container}>
          <TextField
            fullWidth
            type="text"
            label={i18n.t('list_filter')}
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