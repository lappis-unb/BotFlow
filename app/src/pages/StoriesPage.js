import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Creators as StoryAction } from '../ducks/stories';

import { Add } from '../styles/button';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import StoryCard from '../components/StoryCard';
import TextField from '@material-ui/core/TextField';


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
  },
  list_story: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    //columnCount: 6,
  }
}

class StoriesPage extends Component {
  constructor(props) {
    super(props);
    this.props.getStories();
  }


  getToolbarContent() {
    return (
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
            // value={this.state.value}
            style={style.filter_field}
          // InputProps={{ endAdornment: this.getFilterIcon() }}
          // onChange={(e) => this.handleFilterInput(e)}
          />
        </Grid>
      </Grid>
    )
  }

  // getFilterIcon() {
  //   if ((this.state.value).trim().length === 0) {
  //     return <SearchIcon />
  //   } else {
  //     return (
  //       <CloseIcon
  //         onClick={() => this.handleFilterClick()}
  //         style={{ cursor: "pointer" }}
  //       />
  //     )
  //   }
  // }

  getStoriesList() {
    if (this.props.stories !== undefined)
      return this.props.stories.map((story, index) => (
        <StoryCard story={story} />
      ))
  }

  render() {
    return (
      <span>
        <Toolbar style={style.toolbar}>
          {this.getToolbarContent()}
        </Toolbar>
        <div style={style.list_story}>
          {this.getStoriesList()}
        </div>
      </span>
    )
  }
}


const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
