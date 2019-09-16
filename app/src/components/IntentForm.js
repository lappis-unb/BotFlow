import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Creators as IntentAction } from "../ducks/intents";


const style = {
  icon_delete: {
    color: "#4b3953",
    opacity: 0.5,
    top: "0px",
    marginBottom: "20px"
  }
}

class IntentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undo_delete: false
    }
  }

  handleDelete(intent_index) {
    if (this.props.intent_contents.length > 1) {
      this.setState({ undo_delete: true });
      this.props.deleteIntentContent(intent_index);
    }
  }

  handleUndo() {
    this.props.undoDeleteIntentContent();
    this.setState({ undo_delete: false });
  }

  deleteSnack() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.undo_delete}
        onClose={() => this.setState({ undo_delete: false })}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Deletado com sucesso!</span>}
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={() => this.handleUndo()}>
            Desfazer
        </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.setState({ undo_delete: false })}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    )
  }

  setIntentContents() {
    let samples = [];
    if (this.props.intent_contents !== undefined) {
      samples = (this.props.intent_contents).map((sample, sample_index) => {
        return (
          <li key={"sample_content" + sample_index}>
            <Grid container spacing={2} alignItems="flex-end" >
              <Grid item xs={11}>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  fullWidth
                  rowsMax="4"
                  margin="normal"
                  variant="outlined"
                  value={sample}
                  onChange={(e) => this.props.setIntentContent(sample_index, e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><strong>?</strong></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <DeleteIcon
                  style={style.icon_delete}
                  type="button"
                  onClick={() => this.handleDelete(sample_index)}>
                </DeleteIcon>
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
          <ul>
            {this.setIntentContents()}
          </ul>
          <Grid container spacing={2} alignItems="flex-end" >
            {this.deleteSnack()}
            <Grid item xs={11}>
              <TextField
                id="outlined-multiline-flexible"
                style={{
                  opacity: "0.6",
                  filter: "drop-shadow(0px 2px 0px rgba(241, 80, 53, 0.3))",
                  cursor: "pointer"
                }}
                fullWidth
                disabled
                margin="normal"
                variant="outlined"
                value={"Nova pergunta"}
                onClick={() => this.props.addIntent()}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><strong>?</strong></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => { return { ...state.intent } };

const mapDispatchToProps = dispatch => bindActionCreators(IntentAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IntentForm);
