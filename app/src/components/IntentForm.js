import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
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
      undo_delete: false
    }
  }

  handleDelete(intent_index) {
    const intents_length = this.props.item_contents.length;

    if (intents_length > 1) {
      this.setState({ undo_delete: true });
    }

    this.props.deleteIntentText(intent_index);
  }

  handleUndo() {
    this.props.undoDeleteText();
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
        onClose={()=>this.setState({undo_delete: false})}
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

    if (this.props.item_contents !== undefined) {
      samples = this.props.item_contents.map((sample, sample_index) => {
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
                  onChange={(e) => this.props.setIntentText(sample_index, e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><strong>?</strong></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <DeleteIcon
                  style={{ color: "#4b3953", opacity: 0.5, top: "0px", marginBottom: "20px" }}
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
