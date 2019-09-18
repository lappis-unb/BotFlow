import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Creators as StoryAction } from '../ducks/stories';
import { Link } from 'react-router-dom'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Add } from '../styles/button';
import TextField from '@material-ui/core/TextField'
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

class StoriesPage extends Component {
  constructor(props) {
    super(props);
    this.props.getStories();
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
        <GridListTile key={'stories_' + index}>
          <StoryBox>
            <Link to={'/stories/' + story.id}>{story.name}</Link>
          </StoryBox>
        </GridListTile>
      ))
  }

  render() {
    return (
      <div style={{backgroundColor:"#dae8ea", minHeight:"100vh"}}>
        <Toolbar style={style.toolbar}>
          {this.getToolbarContent()}
        </Toolbar>
        <div style={{padding:"1em"}}>
          <GridList cellWidth={200} cellHeight={"auto"} cols={6} spacing={20}>
            {this.getStoriesList()}
          </GridList>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
