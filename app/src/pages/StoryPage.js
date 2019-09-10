import { connect } from "react-redux";
import React, { Component } from "react";
import { getItems, createNewItem } from "../actions/itemsAction";
import { Intent } from '../utils/DataFormat'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Add } from '../styles/button';
import TextField from '@material-ui/core/TextField'
import { STORY_URL } from '../utils/url_routes.js'

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const style = {
  toolbar: {
      background: "#f6f9f9",
      padding: "4px"
  },
  grid_item_list: {
      background: "#dae8ea"
  },
  create_button: {
      margin: "24px 24px"
  },
  filter_field: {
    margin: "16px 16px",
    height: "40px", 
    width: "300px",
  }
}

const options = ['Apagar']

class StoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered_items: this.props.items,
      value: ""
    };
    this.props.getItems(STORY_URL);
    this.props.createNewItem(new Intent());
  }

  setDataFormat(id = undefined, name = "", content = [""]) {
    return new Intent(id, name, content)
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

  getToolbarContent(){
    return(
      <Grid container spacing={2}>
          <Grid item xs={2}>
            <Button color="primary" variant="contained" style={style.create_button}
              onClick={() => this.handleClick(false)}>
                <Add />Criar novo diálogo
            </Button> 
          </Grid>
          < Grid item xs={7}></Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="text"
              label="Filtrar"
              variant="outlined"
              value={this.state.value}
              style={style.filter_field}
              InputProps={{ endAdornment: this.getFilterIcon() }}
              onChange={(e) => this.handleFilterInput(e)}
            /> 
          </Grid>
        </Grid>
    )
  }

  render() {
    return (
      <Toolbar style={style.toolbar}>
        {this.getToolbarContent()}
      </Toolbar>
    )
  }
}

const mapStateToProps = state => { return { ...state.intentReducer } };

const mapDispatchToProps = dispatch => ({
  getItems: (url) => dispatch(getItems(url)),
  createNewItem: (new_item) => dispatch(createNewItem(new_item))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
