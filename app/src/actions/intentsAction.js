import { Intent } from '../utils/DataFormat.js'

export const addIntentText = () => {
  const intent = new Intent();
  return {
    type: "ADD_INTENT_TEXT",
    text: intent.samples[0]
  };
}

export const setIntentText = (intent_position, text) => {
  return {
    type: "SET_INTENT_TEXT",
    text: text,
    intent_position: intent_position
  };
}

export const deleteIntentText = (intent_position) => {
  return {
    type: "REMOVE_INTENT_TEXT",
    intent_position: intent_position
  };
}

export const undoDeleteText = () => {
  return { type: "UNDO_INTENT_TEXT_REMOVAL" };
}