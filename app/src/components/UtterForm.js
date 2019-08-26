import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { DialogBox } from '../styles/dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import { setUtterText, addUtterText, undoTextRemotion, removeUtterText, changeUtterForm } from "../actions/uttersAction";
import Checkbox from '@material-ui/core/Checkbox';


class UtterForm extends Component {

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
                  <DialogBox>
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

  render() {
    return (
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={7}>

          <p>Os balões são falas alternativas</p>
          <Checkbox
            value="checkedA"
            color="default"
            checked={this.props.alternatives}
            onChange={() => this.props.changeUtterForm(this.props.alternatives, this.props.current_utter)}
          />

          <ul>
            {this.setUtterTexts()}
          </ul>

          {/* <button type="button" onClick={() => this.props.undoTextRemotion()}>Desfazer</button> */}

          <DialogBox onClick={() => this.props.addUtterText()} >
            <textarea disabled type="text" value="Novo balão de resposta" />
          </DialogBox>
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
