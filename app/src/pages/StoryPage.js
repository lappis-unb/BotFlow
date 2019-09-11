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

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { StoryBox } from '../styles/story';

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

const dialogitems = ['teste1muitosmuitosmuitostextos', 'teste2', 'teste3', 'teste4', 'teste5' , 'teste6', 'teste7', 'teste8']

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

  getGridList(){
    return(
      <GridList cellWidth={200} cols={6} spacing={20}>
          {dialogitems.map(item =>(
            <GridListTile >
              <StoryBox>
                <textarea type="text"
                  placeholder={item}
                  rows="1" />
              </StoryBox>
            </GridListTile>
          ))} 
      </GridList>
    )
  }

  render() {
    return (
    <div style={{backgroundColor:"#dae8ea", minHeight:"100vh"}}>
      <Toolbar style={style.toolbar}>
        {this.getToolbarContent()}
      </Toolbar>
      <div style={{padding:"1em"}}>
        {this.getGridList()}
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => { return { ...state.intentReducer } };

const mapDispatchToProps = dispatch => ({
  getItems: (url) => dispatch(getItems(url)),
  createNewItem: (new_item) => dispatch(createNewItem(new_item))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
