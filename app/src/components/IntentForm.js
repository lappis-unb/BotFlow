import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { DialogBox, Add} from '../styles/dialog';

import { connect } from "react-redux";
import { setIntentName, setIntentText, addIntentText, undoTextRemotion, removeIntentText, changeIntentForm } from "../actions/intentsAction";


class IntentForm extends Component {
  setIntentTexts() {
    let intents_texts = [];

    if (this.props.current_intent.intent !== undefined) {
      intents_texts = this.props.current_intent.intent.map((intent, pos) => {
          return (
            <li key={"intent_text" + pos}>
            <div>
              <Grid container spacing={1} justify="space-between" alignItems="flex-end" >
                <Grid item xs={10}>
              <DialogBox>
                  <textarea type="text" value={intent.text}
                    onChange={(e) => this.props.setIntentText(pos, e.target.value, this.props.current_intent)} />
              </DialogBox>
                </Grid>
                <Grid item xs={2}>
                  <DeleteIcon 
                    style={{color:"#4b3953", opacity: 0.5}}
                    type="button" 
                    onClick={() => this.props.removeIntentText(intent)}>
                  </DeleteIcon>
                </Grid>
              </Grid>
            </div>
            </li>
          )
      });
    }

    return intents_texts;
  }

  render() {
    let intent_name = (this.props.current_intent !== undefined) ? this.props.current_intent.nameIntent : "";
    return (
      <div>
            <form>
              <br />
              <Grid item xs={5}>
                <label>
                  <ul>
                    {this.setIntentTexts()}
                  </ul>
                </label>  
                </Grid>
                <br />
              <button type="button" onClick={() => this.props.undoTextRemotion()}>Desfazer</button>
              <button type="button" onClick={() => this.props.addIntentText()}>Novo Balão De Resposta</button>
            </form>
            <h1>{intent_name}</h1>
            <pre>{JSON.stringify(this.props.current_intent, null, 2)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
  addIntentText: () => dispatch(addIntentText()),
  undoTextRemotion: () => dispatch(undoTextRemotion()),
  removeIntentText: (text_position) => dispatch(removeIntentText(text_position)),
  setIntentText: (position, text, current_intent) => dispatch(setIntentText(position, text, current_intent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IntentForm);
