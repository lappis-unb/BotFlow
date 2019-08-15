import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";
import { setUtterName, setUtterText, addUtterText, undoTextRemotion, removeUtterText } from "../actions/uttersAction";


class UtterForm extends Component {
  setUtterTexts() {
    let utters_texts = [];

    if (this.props.current_utter.utters !== undefined) {

      utters_texts = this.props.current_utter.utters.map((utter_text_list, utter_index) => {
        return utter_text_list.utterText.map((utter_text, text_index) => {
          return (
            <li key={"utter_text" + utter_index + text_index}>
            <Grid item xs={1}>
              <textarea type="text" value={utter_text.text}
                onChange={(e) => this.props.setUtterText(utter_index, text_index, e.target.value, this.props.current_utter)} />
              <button type="button" onClick={() => this.props.removeUtterText(utter_index)}>Deletar texto</button>
            </Grid>
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
        <Grid container xs={9}>
            <form>
              <label>
                <TextField
                  helperText={this.props.helper_text}
                  id="utter-name"
                  label="Nome da resposta"
                  margin="normal"
                  type="text"
                  value={utter_name}
                  onChange={(e) => this.props.setUtterName(e.target.value, this.props.utters)}
                />
              </label>

              <br />
              
              <label>
                <h1>Textos das respostas:</h1>
                <ul>
                  {this.setUtterTexts()}
                </ul>
              </label>

              <button type="button" onClick={() => this.props.undoTextRemotion()}>Desfazer</button>
              <button type="button" onClick={() => this.props.addUtterText()}>Novo Balão De Resposta</button>
            </form>

            <h1>{utter_name}</h1>
            <pre>{JSON.stringify(this.props.current_utter, null, 2)}</pre>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
  addUtterText: () => dispatch(addUtterText()),
  undoTextRemotion: () => dispatch(undoTextRemotion()),
  setUtterName: (utter_name) => dispatch(setUtterName(utter_name)),
  removeUtterText: (text_position) => dispatch(removeUtterText(text_position)),
  setUtterText: (utter_position, text_position, text, current_utter) => dispatch(setUtterText(utter_position, text_position, text, current_utter))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterForm);
