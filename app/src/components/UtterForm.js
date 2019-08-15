import React, { Component } from "react";

import { connect } from "react-redux";
import { setUtterText, addUtterText, undoTextRemotion, removeUtterText } from "../actions/uttersAction";


class UtterForm extends Component {
  setUtterTexts() {
    let utters_texts = [];

    if (this.props.current_utter.utters !== undefined) {

      utters_texts = this.props.current_utter.utters.map((utter_text_list, utter_index) => {
        return utter_text_list.utterText.map((utter_text, text_index) => {
          return (
            <li key={"utter_text" + utter_index + text_index}>
              <textarea type="text" value={utter_text.text}
                onChange={(e) => this.props.setUtterText(utter_index, text_index, e.target.value, this.props.current_utter)} />
              <button type="button" onClick={() => this.props.removeUtterText(utter_index)}>Deleter o texto</button>
            </li>
          )
        })
      });
    }

    return utters_texts;
  }

  render() {
    return (
      <div>
        <form>
          <br />
          <ul>
            {this.setUtterTexts()}
          </ul>

          <button type="button" onClick={() => this.props.undoTextRemotion()}>UNDO</button>
          <button type="button" onClick={() => this.props.addUtterText()}>ADD MORE</button>
        </form>

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
  setUtterText: (utter_position, text_position, text, current_utter) => dispatch(setUtterText(utter_position, text_position, text, current_utter))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterForm);
