import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { DialogBox, Add} from '../styles/dialog';

import { connect } from "react-redux";
import { setUtterName, setUtterText, addUtterText, undoTextRemotion, removeUtterText, changeUtterForm } from "../actions/uttersAction";
import Checkbox from '@material-ui/core/Checkbox';


class UtterForm extends Component {
  setUtterTexts() {
    let utters_texts = [];

    if (this.props.current_utter.utters !== undefined) {
      utters_texts = this.props.current_utter.utters.map((utter_text_list, utter_index) => {
        return utter_text_list.utterText.map((utter_text, text_index) => {
          return (
            <li key={"utter_text" + utter_index + text_index}>
            <div>
              <Grid container spacing={1} justify="space-between" alignItems="flex-end" >
                <Grid item xs={10}>
              <DialogBox>
                  <textarea type="text" value={utter_text.text}
                    onChange={(e) => this.props.setUtterText(utter_index, text_index, e.target.value, this.props.current_utter)} />
              </DialogBox>
                </Grid>
                <Grid item xs={2}>
                  <DeleteIcon 
                    style={{color:"#4b3953", opacity: 0.5}}
                    type="button" 
                    onClick={() => this.props.removeUtterText(utter_index)}>
                  </DeleteIcon>
                </Grid>
              </Grid>
            </div>
            </li>
          )
        })
      });
    }

    return utters_texts;
  }

  render() {
    let utter_name = (this.props.current_utter !== undefined) ? this.props.current_utter.nameUtter : "";
    return (
      <div>
            <form>
          <Checkbox
            value="checkedA"
            color="default"
            checked={this.props.alternatives}
            onChange={() => this.props.changeUtterForm(this.props.alternatives, this.props.current_utter)}
          />
          <p>Os balões são falas alternativas</p>
              <br />
              <Grid item xs={5}>
                <label>
                  <ul>
                    {this.setUtterTexts()}
                  </ul>
                </label>  
                </Grid>
                <br />
              <button type="button" onClick={() => this.props.undoTextRemotion()}>Desfazer</button>
              <button type="button" onClick={() => this.props.addUtterText()}>Novo Balão De Resposta</button>
            </form>
            <h1>{utter_name}</h1>
            <pre>{JSON.stringify(this.props.current_utter, null, 2)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
  addUtterText: () => dispatch(addUtterText()),
  undoTextRemotion: () => dispatch(undoTextRemotion()),
  removeUtterText: (text_position) => dispatch(removeUtterText(text_position)),
  setUtterText: (utter_position, text_position, text, current_utter) => dispatch(setUtterText(utter_position, text_position, text, current_utter)),
  changeUtterForm: (alternatives, current_utter) => dispatch(changeUtterForm(alternatives, current_utter))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterForm);
