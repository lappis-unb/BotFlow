import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import SnackbarDelete from './DeleteSnackbar'
import i18n from '../translate/i18n'

import { Creators as IntentAction } from "../ducks/intents";

const style = {
  new_question: {
    opacity: "0.2",
    position: "relative",
    cursor: "pointer",
    border: "solid 1px #000",
    borderRadius: "4px",
    padding: "10px 0 10px 14px",
  }
}

class IntentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undo_delete: false,
      there_is_auto_focus: false
    }

    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
  }

  handleDelete(intent_index) {
    if (this.props.content.length > 1) {
      this.props.deleteIntentContent(intent_index);
      this.handleSnackbarClick(true);
    }
  }

  handleUndo() {
    this.props.undoDeleteIntentContent();
  }

  handleClick(key = 'Enter') {
    if (key === 'Enter') {
      this.props.addIntent()
      this.setState({ there_is_auto_focus: true });
    }
  }

  handleSnackbarClick(value) {
    this.setState({ undo_delete: value });
  }

  setIntentContents() {
    let samples = [];
    if (this.props.content !== undefined) {
      samples = (this.props.content).map((sample, sample_index) => {
        return (
          <li key={"sample_content" + sample_index}>
            <Grid container spacing={2} alignItems="flex-end" >
              <Grid item xs={11}>
                <TextField
                  id="outlined-multiline-flexible"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={sample}
                  onKeyUp={(event) => { this.handleClick(event.key) }}
                  autoFocus={this.state.there_is_auto_focus}
                  onChange={(e) => this.props.setIntentContent(sample_index, e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><strong>?</strong></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton color="primary" m={0} tabIndex={-1} onClick={() => this.handleDelete(sample_index)}>
                  <DeleteIcon style={{ opacity: 0.5 }} />
                </IconButton>
              </Grid>
            </Grid>
          </li>
        )
      })
    }

    return samples;
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <ul style={{ marginTop: 24 }}>
            {this.setIntentContents()}
          </ul>
          <Grid container spacing={2} alignItems="flex-end" >
            <SnackbarDelete
              handleSnackbarClick={this.handleSnackbarClick}
              handleUndo={this.props.undoDeleteIntentContent}
              undo={this.state.undo_delete}
            />
            <Grid item xs={11}>
              <div style={style.new_question} tabIndex={0}
                onClick={() => { this.handleClick() }}
              >
                <Typography variant="body2">{i18n.t('intent_form.new_question')}</Typography>
              </div>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3} />
      </Grid>
    );
  }
}

const mapStateToProps = state => { return { ...state.intent } };

const mapDispatchToProps = dispatch => bindActionCreators(IntentAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IntentForm);
