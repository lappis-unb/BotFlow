import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Creators as StoryAction } from '../ducks/stories';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { Add } from '../styles/button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { message } from '../utils/messages';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import StoryCard from '../components/StoryCard';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SnackbarDelete from '../components/DeleteSnackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  toolbar: {
    background: "#f6f9f9",
    padding: "6px 24px"
  },
  create_button: {
    marginTop: '9px'
  },
  loading: {
    margin: "auto",
    width: "100vw"
  },
  list_story: {
    background: "#dae8ea",
    padding: 16,
    height: 'calc(100vh - 74px - 92px - 16px)',
    maxWidth: '100vw',
    overflowX: 'auto',
    columnCount: 6,
    columnGap: 0,
    columnFill: 'auto'
  }
}

class StoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      undo_delete: false
    }
    this.props.getStories();
  }

  handleTextChange(target) {
    this.setState({ value: target });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.getStories(this.state.value);
    }, 700);
  }

  getToolbarContent() {
    return (
      <Grid container>
        <Grid item xs={9}>
          <Link to='/stories/new' style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="contained" style={style.create_button}>
              <Add />Criar novo diálogo
            </Button>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            type="text"
            label="Filtrar"
            value={this.state.value}
            variant="outlined"
            InputProps={{ endAdornment: this.getFilterIcon() }}
            onChange={(e) => this.handleTextChange(e.target.value)}
          />
        </Grid>
      </Grid>
    )
  }

  cleanFilter() {
    this.props.getStories('')
    this.setState({ value: '' })
  }

  getFilterIcon() {
    if ((this.state.value).trim().length === 0) {
      return <SearchIcon />
    } else {
      return (
        <CloseIcon
          onClick={() => this.cleanFilter()}
          style={{ cursor: "pointer" }}
        />
      )
    }
  }

  getStoriesList() {
    if(this.props.loading){
      return <div style={style.loading}><center><CircularProgress /></center></div>;
    }
    else {
      if (this.props.stories !== undefined && this.props.stories.length !== 0) {
        return this.props.stories.map((story, index) => (
          <StoryCard key={'story_card_' + index} highlighted_text={this.state.value} story={story} />
        ));
      } else {
        return <div style={{position:'absolute', width:'97%', textAlign:'center'}}><Typography variant="h5" color="secondary">{message.no_result}</Typography></div>;
      }
    }
  }

  handleSnackbarClick(value) {
    this.setState({ undo_delete: value });
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
        <SnackbarDelete
          handleSnackbarClick={this.handleSnackbarClick}
          handleUndo={this.props.undoDeleteContent}
          undo={this.state.undo_delete}
        />
      </span>
    )
  }
}

const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
