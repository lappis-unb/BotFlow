import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { DialogBoxPrimary, DialogBoxSecondary } from '../styles/dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { bindActionCreators } from 'redux';
import { Creators as UtterAction } from '../ducks/utters';
import SnackbarDelete from './DeleteSnackbar'

const ALTERNATIVES_TEXT = "como alternativas";
const SEQUENCE_TEXT = "em sequência";

class UtterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: [SEQUENCE_TEXT, ALTERNATIVES_TEXT],
      value: SEQUENCE_TEXT,
      there_is_auto_focus: false,
      undo_delete: false
    }

    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
  }

  changeTextarea = (utter_index, text_index, e) => {
    this.multilineTextarea.style.height = 'auto';
    this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';
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
              <Grid container spacing={2} alignItems="flex-end" >
                <Grid item xs={10}>
                  {content_index === 0 ?
                    <DialogBoxPrimary>
                      <textarea type="text" autoFocus={this.state.there_is_auto_focus} value={alternative_content}
                        rows="1"
                        onChange={(e) => this.changeTextarea(alternative_index, content_index, e)}
                        ref={ref => this.multilineTextarea = ref} />
                    </DialogBoxPrimary>
                    :
                    <DialogBoxSecondary>
                      <textarea type="text" autoFocus={this.state.there_is_auto_focus} value={alternative_content}
                        rows="1"
                        onChange={(e) => this.changeTextarea(alternative_index, content_index, e)}
                        ref={ref => this.multilineTextarea = ref} />
                    </DialogBoxSecondary>}
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="primary" m={0}
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
      this.props.changeUtterForm(this.props.content, (event.target.value === ALTERNATIVES_TEXT))
    }
  }

  getSelectedOption() {
    return (this.props.multiple_alternatives) ? ALTERNATIVES_TEXT : SEQUENCE_TEXT;
  }

  handleClick() {
    this.props.addUtterContent();
    this.setState({ there_is_auto_focus: true });
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
                label="Balões aparecem:"
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
                <DialogBoxPrimary
                  style={{
                    opacity: "0.6",
                    filter: "drop-shadow(0px 2px 0px rgba(241, 80, 53, 0.3))"
                  }}
                  onClick={() => { this.handleClick() }}>
                  <textarea
                    readOnly
                    type="text"
                    rows="1"
                    style={{ cursor: "pointer" }}
                    placeholder="Novo balão de resposta" />
                </DialogBoxPrimary> :
                <DialogBoxSecondary
                  style={{
                    opacity: "0.6",
                    filter: "drop-shadow(0px 2px 0px rgba(241, 80, 53, 0.3))"
                  }}
                  onClick={() => { this.handleClick() }}>
                  <textarea
                    readOnly
                    type="text"
                    rows="1"
                    style={{ cursor: "pointer" }}
                    placeholder="Novo balão de resposta" />
                </DialogBoxSecondary>}

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
