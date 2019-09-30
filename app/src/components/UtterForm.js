import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { message } from '../utils/messages';
import SnackbarDelete from './DeleteSnackbar';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { Creators as UtterAction } from '../ducks/utters';
import { DialogBoxPrimary, DialogBoxSecondary, NewPrimaryDialog, NewSecondaryDialog } from '../styles/dialog';

class UtterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: [message.utter.sequence_text, message.utter.alternatives_text],
      value: message.utter.sequence_text,
      there_is_auto_focus: false,
      undo_delete: false
    }

    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
  }

  changeTextarea = (utter_index, text_index, e) => {
    this.props.setUtterContent(e.target.value, utter_index, text_index)
  }

  handleDelete(utter_index, text_index) {
    const utters_length = this.props.content.length;
    const utters_text_length = this.props.content[0].length;

    if (utters_length > 1 || utters_text_length > 1) {
      this.handleSnackbarClick(true);
      this.props.deleteUtterContent(utter_index, text_index);
    }
  }

  handleSnackbarClick(value) {
    this.setState({ undo_delete: value });
  }

  setUtterContents() {
    let utters_texts = [];
    if (this.props.content !== undefined) {
      utters_texts = this.props.content.map((alternative, alternative_index) => {
        return alternative.map((alternative_content, content_index) => {
          return (
            <li key={"alternative_content" + alternative_index + content_index} style={{ marginBottom: 24 }}>
              <Grid container spacing={1} alignItems="flex-end" >
                <Grid item xs={10}>
                  {content_index === 0 ?
                    <DialogBoxPrimary>  
                        <TextField
                            fullWidth
                            margin="dense"
                            multiline
                            value={alternative_content}
                            onKeyUp={(event) => { this.handleClick(event.key) }}
                            autoFocus={this.state.there_is_auto_focus}
                            onChange={(e) => this.changeTextarea(alternative_index, content_index, e)}
                            InputProps={{
                               disableUnderline: true
                            }}
                            />
                    </DialogBoxPrimary>
                    :
                    <DialogBoxSecondary>
                        <TextField
                            fullWidth
                            margin="dense"
                            multiline
                            value={alternative_content}
                            onKeyUp={(event) => { this.handleClick(event.key) }}
                            autoFocus={this.state.there_is_auto_focus}
                            onChange={(e) => this.changeTextarea(alternative_index, content_index, e)}
                            InputProps={{
                               disableUnderline: true
                            }}
                            />
                    </DialogBoxSecondary>}
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="primary" m={0}
                    tabIndex={-1}
                    onClick={() => this.handleDelete(alternative_index, content_index)}>
                    <DeleteIcon style={{ opacity: 0.5 }} />
                  </IconButton>
                </Grid>
              </Grid>
            </li>
          )
        })
      });
    }

    return utters_texts;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if ((event.target.value !== this.props.multiple_alternatives)) {
      this.props.changeUtterForm(this.props.content, (event.target.value === message.utter.alternatives_text))
    }
  }

  getSelectedOption() {
    return (this.props.multiple_alternatives) ? message.utter.alternatives_text : message.utter.sequence_text;
  }

  handleClick(key = 'Enter') {
    if (key === 'Enter') {
      this.props.addUtterContent();
      this.setState({ there_is_auto_focus: true });
    }
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <Grid container spacing={2} style={{ marginTop: 12, marginBottom: 12, textAlign: "right" }}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                select
                margin="normal"
                variant="outlined"
                value={this.getSelectedOption()}
                id="outlined-select-currency"
                style={{ width: 200 }}
                label={message.utter.selection}
                onChange={(e) => this.handleChange(e)}>
                {(this.state.values).map((option, index) => (
                  <MenuItem key={"menu" + index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <ul>
            {this.setUtterContents()}
          </ul>
          <Grid container spacing={2} alignItems="flex-end" >
            <Grid item xs={10}>
              {this.props.multiple_alternatives ?
                <NewPrimaryDialog onClick={() => { this.handleClick() }}>
                    <Typography variant="body1">Novo balão de resposta</Typography>
                </NewPrimaryDialog> :
                <NewSecondaryDialog onClick={() => { this.handleClick() }}>
                    <Typography variant="body1">Novo balão de resposta</Typography>
                </NewSecondaryDialog>
              }
            </Grid>
            <Grid item xs={2} />
          </Grid>

          <SnackbarDelete
            handleSnackbarClick={this.handleSnackbarClick}
            handleUndo={this.props.undoDeleteUtterContent}
            undo={this.state.undo_delete}
          />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={3} />
      </Grid>
    );
  }
}

const mapStateToProps = state => { return { ...state.utter } };

const mapDispatchToProps = dispatch => bindActionCreators(UtterAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UtterForm);
