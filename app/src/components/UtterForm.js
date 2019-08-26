import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { DialogBox } from '../styles/dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import { setUtterText, addUtterText, undoTextRemotion, removeUtterText, changeUtterForm } from "../actions/uttersAction";
import MenuItem from '@material-ui/core/MenuItem';

import TextField from '@material-ui/core/TextField';


class UtterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: ["", "alternativas"],
      value: ""
    }
  }

  changeTextarea = (utter_index, text_index, e) => {
    this.multilineTextarea.style.height = 'auto';
    this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';
    this.props.setUtterText(utter_index, text_index, e.target.value, this.props.current_utter)
  }

  setUtterTexts() {
    let utters_texts = [];

    if (this.props.current_utter.utters !== undefined) {
      utters_texts = this.props.current_utter.utters.map((utter_text_list, utter_index) => {
        return utter_text_list.utterText.map((utter_text, text_index) => {
          return (
            <li key={"utter_text" + utter_index + text_index}>
              <Grid container spacing={2} alignItems="flex-end" >
                <Grid item xs={11}>
                  <DialogBox className="dialog_box">
                    <textarea type="text" value={utter_text.text}
                      onChange={(e) => this.changeTextarea(utter_index, text_index, e)}
                      ref={ref => this.multilineTextarea = ref} />
                  </DialogBox>
                </Grid>
                <Grid item xs={1}>
                  <DeleteIcon
                    style={{ color: "#4b3953", opacity: 0.5 }}
                    type="button"
                    onClick={() => this.props.removeUtterText(utter_index)}>
                  </DeleteIcon>
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
    this.props.changeUtterForm((this.state.value === "alternativas"), this.props.current_utter)
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <TextField
            fullWidth
            select
            margin="normal"
            variant="outlined"
            value={this.state.value}
            id="outlined-select-currency"
            label="Balões aparecem como:"
            onChange={(e) => this.handleChange(e)}>
            {(this.state.values).map((option, index) => (
              <MenuItem key={"menu" + index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <ul>
            {this.setUtterTexts()}
          </ul>

          {/* <button type="button" onClick={() => this.props.undoTextRemotion()}>Desfazer</button> */}

          <Grid container spacing={2} alignItems="flex-end" >
            <Grid item xs={11}>
              <DialogBox
                style={{
                  opacity: "0.6",
                  filter: "drop-shadow(0px 2px 0px rgba(241, 80, 53, 0.3))"
                }}
                onClick={() => this.props.addUtterText()} >
                <textarea
                  readOnly
                  type="text"
                  style={{ cursor: "pointer" }}
                  placeholder="Novo balão de resposta" />
              </DialogBox>
            </Grid>
            <Grid item xs={1} />
          </Grid>

        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <pre>{JSON.stringify(this.props.current_utter, null, 2)}</pre>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.utterReducer }
};

const mapDispatchToProps = dispatch => ({
  addUtterText: () => dispatch(addUtterText()),
  undoTextRemotion: () => dispatch(undoTextRemotion()),
  removeUtterText: (text_position) => dispatch(removeUtterText(text_position)),
  setUtterText: (utter_position, text_position, text, current_utter) => dispatch(setUtterText(utter_position, text_position, text, current_utter)),
  changeUtterForm: (alternatives, current_utter) => dispatch(changeUtterForm(alternatives, current_utter))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterForm);
