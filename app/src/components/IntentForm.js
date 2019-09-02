import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { DialogBox } from '../styles/dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


import {
  setIntentText,
  addIntentText,
  undoDeleteText,
  deleteIntentText
} from "../actions/intentsAction";

class IntentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      undoDelete: false
    }
  }

  handleDelete(intent_index) {
    const intents_length = this.props.item_contents.length;

    if (intents_length > 1) {
      this.setState({ undoDelete: true });
    }

    this.props.deleteIntentText(intent_index);
  }

  handleUndo() {
    this.props.undoDeleteText();
    this.setState({ undoDelete: false });
  }

  deleteSnack() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.undoDelete}
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
            onClick={() => this.setState({ undoDelete: false })}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    )
  }

  setIntentContents() {
    let questions = [];

    if (this.props.item_contents !== undefined) {
      questions = this.props.item_contents.map((question, question_index) => {
        return (
          <li key={"question_content" + question_index}>
            <Grid container spacing={2} alignItems="flex-end" >
              <Grid item xs={11}>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  fullWidth
                  rowsMax="4"
                  margin="normal"
                  variant="outlined"
                  value={question.text}
                  onChange={(e) => this.props.setIntentText(question_index, e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><strong>?</strong></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <DeleteIcon
                  style={{ color: "#4b3953", opacity: 0.5, top: "0px", marginBottom: "20px" }}
                  type="button"
                  onClick={() => this.handleDelete(question_index)}>
                </DeleteIcon>
              </Grid>
            </Grid>
          </li>
        )
      })
    }

    return questions;
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
                  onClick={() => this.props.addIntentText()} 
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
          <p>Name: {this.props.name_item}</p>
          <p>id_item: {this.props.id_item}</p>
          <pre>{JSON.stringify(this.props.item_contents, null, 2)}</pre>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.intentReducer }
};

const mapDispatchToProps = dispatch => ({
  addIntentText: () => dispatch(addIntentText()),
  undoDeleteText: () => dispatch(undoDeleteText()),
  deleteIntentText: (intent_position) => dispatch(deleteIntentText(intent_position)),
  setIntentText: (intent_position, text) => dispatch(setIntentText(intent_position, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(IntentForm);
