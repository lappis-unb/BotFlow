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
import Typography from '@material-ui/core/Typography';


import { Creators as IntentAction } from "../ducks/intents";


const style = {
  new_question: {
      opacity: "0.2",
      position:"relative",
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
  
  handleClick() {
    this.props.addIntent()
    this.setState({ there_is_auto_focus: true });
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
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={sample}
                  autoFocus={this.state.there_is_auto_focus} 
                  onChange={(e) => this.props.setIntentContent(sample_index, e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><strong>?</strong></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton color="primary" m={0} onClick={() => this.handleDelete(sample_index)}>
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
          <ul style={{marginTop:24}}>
            {this.setIntentContents()}
          </ul>
          <Grid container spacing={2} alignItems="flex-end" >
            {this.deleteSnack()}
            <Grid item xs={11}>
              <div style={style.new_question} 
                onClick={() => { this.handleClick() }}>
                  <Typography variant="body2">Nova pergunta</Typography>
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
