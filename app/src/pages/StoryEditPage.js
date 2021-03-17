import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import ItemsList from '../components/ItemsList';
import Snackbar from '../components/Snackbar';
import ErrorSnackbar from '../components/StorySnackbar';
import { Creators as StoryAction } from '../ducks/stories';
import IntentIcon from '../icons/IntentIcon';
import UtterIcon from '../icons/UtterIcon';
import StoryList from '../components/StoryList';
import { Story } from '../utils/DataFormat.js';
import ToolbarName from '../components/ToolbarName';
import ExampleStory from '../components/ExampleStory';
import DeletionConfirmationDialog from '../components/DeletionConfirmationDialog';
import { message } from '../utils/messages';
import { Add } from '../styles/button';

const style = {
  grid_item_list: {
    background: '#dae8ea',
    paddingTop: '15px',
    height: 'calc(100vh - 74px - 64px - 88px)',
    overflowY: 'auto',
  },
  list_container_utter: {
    paddingLeft: '16px',
  },
  list_container_intent: {
    paddingLeft: '16px',
    borderRight: 'solid 1px #CCC',
  },
  filter_items_container: {
    padding: '12px 8px',
    background: '#dae8ea',
    width: '100%',
  },
  list: {
    marginTop: '15px',
  },
  create_button: { padding: '18px 24px', background: '#dae8ea' },
};

class StoryEditPage extends Component {
  constructor(props) {
    super(props);
    this.props.getIntents();
    this.props.getUtters();

    const id = this.props.history.location.pathname.split('/').pop();
    isNaN(id) ? this.props.createNewStory() : this.getStory(id);

    this.state = {
      value: '',
      dialog_status: false,
    };
    this.changeStatusDialog = this.changeStatusDialog.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
  }

  changeStatusDialog(value) {
    this.setState({ dialog_status: value });
  }

  deleteStory() {
    this.props.deleteStory(this.props.story_id);
    this.setState({ dialog_status: false });
    setTimeout(() => this.props.getStories(), 2000);
    this.props.history.push('/');
  }

  getStory() {
    const story_id = window.location.pathname.split('/').pop();
    if (story_id.length !== 0) {
      this.props.getStory(story_id);
    } else {
      this.props.createNewStory();
    }
  }

  filterItems(items = []) {
    return items.filter((item) => (item.name).includes(this.state.value));
  }

  handleFilterClick() {
    this.setState({ value: '' });
    this.filterItems();
  }

  handleFilterInput(e) {
    this.setState({ value: e.target.value });
    this.filterItems();
  }

  getFilterIcon() {
    if ((this.state.value).trim().length === 0) {
      return <SearchIcon />;
    }
    return (
      <CloseIcon
        onClick={() => this.handleFilterClick()}
        style={{ cursor: 'pointer' }}
      />
    );
  }

  isButtonEnabled() {
    const first_element_is_intent = (this.props.content.length !== 0 && this.props.content[0].type !== 'utter');
    const contents_changed = JSON.stringify(this.props.content) !== JSON.stringify(this.props.old_content);
    const is_enabled = this.props.content_text_validation.length === 0;

    return first_element_is_intent && contents_changed && is_enabled;
  }

  render() {
    return (
      <Grid container item xs={12}>
        <Grid container item xs={4} direction="column">
          <div style={style.create_button}>
            <Link onClick={() => this.props.createNewStory()} to="/stories/new" style={{ textDecoration: 'none' }}>
              <Button
                color="primary"
                variant="contained"
              >
                <Add />
                {message.story.create_button}
              </Button>
            </Link>
          </div>
          <Grid container direction="row" style={style.grid_item_list}>
            <Grid item xs={2} sm={6} style={style.list_container_intent}>
              <Typography variant="body2" color="primary">
                Perguntas
              </Typography>
              <ItemsList
                story
                icon={<IntentIcon />}
                highlighted_text={this.state.value}
                actionOnClick={this.props.addIntent}
                items={this.filterItems(this.props.intents)}
                content={this.props.content}
                selected_item_position={this.props.selected_item_position}
              />
            </Grid>
            <Grid item xs={2} sm={6} style={style.list_container_utter}>
              <Typography variant="body2" color="primary">
                Respostas
              </Typography>
              <ItemsList
                story
                icon={<UtterIcon />}
                isSelected={this.isSelected}
                content={this.props.content}
                highlighted_text={this.state.value}
                actionOnClick={this.props.addUtter}
                items={this.filterItems(this.props.utters)}
                selected_item_position={this.props.selected_item_position}
              />
            </Grid>
          </Grid>
          <Grid container>
            <div style={style.filter_items_container}>
              <TextField
                fullWidth
                type="text"
                label="Filtrar"
                variant="outlined"
                value={this.state.value}
                InputProps={{ endAdornment: this.getFilterIcon() }}
                onChange={(e) => this.handleFilterInput(e)}
              />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={8}>
          <ToolbarName
            story
            is_enabled={this.isButtonEnabled()}
            saveData={this.props.saveData}
            deleteItem={() => this.changeStatusDialog(true)}
            item={new Story(this.props.story_id, this.props.content, this.props.name)}
          />
          <div style={{
            height: 'calc(100vh - 74px - 72px)',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          >
            <Grid container item xs={12} direction="row">
              <Grid
                container
                item
                xs={8}
                justify="center"
                alignItems="flex-start"
                style={style.list}
              >
                <StoryList />
              </Grid>
              <Grid container item xs={4}>
                <ExampleStory />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <ErrorSnackbar
          variant="error"
          handleClose={() => this.props.notifyContentTextValidation('')}
          notification_text={this.props.content_text_validation}
        />
        <Snackbar
          handleClose={() => this.props.notifyAction('')}
          notification_text={this.props.notification_text}
        />
        <DeletionConfirmationDialog
          handleClose={() => this.changeStatusDialog(false)}
          deleteItem={this.deleteStory}
          dialog_status={this.state.dialog_status}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.story });

const mapDispatchToProps = (dispatch) => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditPage);
