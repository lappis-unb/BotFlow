import { connect } from "react-redux";
import React, { Component } from "react";
import { selectItem } from "../actions/itemsAction";
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, ListItemIcon, ListItemText, styled } from '@material-ui/core';
import IntentIcon from '../icons/IntentIcon';
import UtterIcon from '../icons/UtterIcon';

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

  getIcon(isIntent){
    if(this.props.story){
      if(isIntent){
        return <IntentIcon/>
      }else{
        return <UtterIcon />
      }
    }else{
      return this.props.icon
    }
  }

  itemsList(arr, isIntent) {
    let filtered_items = this.filterItems(arr);
    
    if (filtered_items.length !== 0) {
      return filtered_items.map((item, index) => (
        <StyledListItem
          button
          id={"items_list_" + index}
          key={"items_list" + index}
          selected={(this.props.selected_item_position) === index}
          onClick={() => this.handleListItemClick(item, index)}>
          <ListItemIcon>{this.getIcon(isIntent)}</ListItemIcon>
          <ListItemText>
            <Typography noWrap>
              {this.setHighlight(item.name)}
            </Typography>
          </ListItemText>
        </StyledListItem>
      ));
    } else {
      return (
        <Typography style={{marginTop: "15px"}} noWrap>
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

  filterItems(arr) {
    
    return arr.filter(item => (item.name).includes(this.state.value));
  }


  handleListItemClick(item, index) {
    this.props.selectItem(item, index, this.props.items);
  }

  handleFilterClick() {
    this.setState({ value: "" });
  }

  handleFilterInput(e) {
    this.setState({ value: e.target.value });
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

renderList(arr, text, isIntent){
  return(
    <div>
      <div style={style.list_container}>
        <Typography variant="body2" color="primary">
          {text}
        </Typography>
        <List dense={true} style={style.items_list}>
          {this.itemsList(arr, isIntent)}
        </List>
      </div>
      <Divider />
      {
        !this.props.story?
        <div style={style.filter_items_container}>
          <TextField
            fullWidth
            type="text"
            label="Filtrar"
            variant="outlined"
            value={this.state.value}
            style={style.field_form}
            InputProps={{ endAdornment: this.getFilterIcon(arr) }}
            onChange={(e) => this.handleFilterInput(e, arr)}
          />
      </div>
          :null
      }
    </div>
  )
}
  render_story() {
    return (
        <Grid container direction='column'>

        <Grid container direction='row'>
          <Grid item xs={3} sm={6} style={style.grid_item_list}>
            {this.renderList(this.props.items.intents, 'Perguntas', true)}
          </Grid>
          <Grid item xs={3} sm={6} style={style.grid_item_list}>
            {this.renderList(this.props.items.utters, 'Respostas', false)}
          </Grid>
        </Grid>
          <div style={style.filter_items_container}>
            <TextField
              fullWidth
              type="text"
              label="Filtrar"
              variant="outlined"
              value={this.state.value}
              style={style.field_form}
              InputProps={{ endAdornment: this.getFilterIcon() }}
              onChange={(e) => this.handleFilterInput(e)}
              />
          </div>
              </Grid>
    )
  }

  render() {
    return (
      <div>
      {this.props.story?
      this.render_story()
        :
      this.renderList(this.props.items, this.props.text, null)
      }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  selectItem: (item, item_index, items) => dispatch(selectItem(item, item_index, items))
});

export default connect(null, mapDispatchToProps)(ItemsList);
