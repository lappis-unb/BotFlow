import React, { Component } from "react";
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
              <textarea type="text" value={utter_text.text}
                onChange={(e) => this.props.setUtterText(utter_index, text_index, e.target.value)} />
              <button type="button" onClick={() => this.props.removeUtterText(utter_index)}>Deleter o texto</button>
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
          <label>
            <h1>Resposta:</h1>
            <input type="text" value={utter_name} onChange={(e) => this.props.setUtterName(e.target.value)} />
          </label>

          <br />
          
          <label>
            <h1>Textos das respostas:</h1>
            <ul>
              {this.setUtterTexts()}
            </ul>
          </label>
          
          <button type="button" onClick={() => this.props.undoTextRemotion()}>UNDO</button>
          <button type="button" onClick={() => this.props.addUtterText()}>ADD MORE</button>
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
  setUtterName: (utter_name) => dispatch(setUtterName(utter_name)),
  removeUtterText: (text_position) => dispatch(removeUtterText(text_position)),
  setUtterText: (utter_position, text_position, text) => dispatch(setUtterText(utter_position, text_position, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterForm);
