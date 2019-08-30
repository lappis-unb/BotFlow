export const addUtterText = (new_utter) => {
  return {
    type: "ADD_UTTER_TEXT",
    text: { ...new_utter.utters[0] }
  };
}

const setUtterTextAction = (item_position, text_position, text) => {
  return {
    type: "SET_UTTER_TEXT",
    text: text,
    text_position: text_position,
    utter_position: item_position
  };
}

export const removeUtterText = (item_position, text_position) => {
  return {
    type: "REMOVE_UTTER_TEXT",
    text_position: text_position,
    utter_position: item_position
  };
}

export const undoTextRemotion = () => {
  return { type: "UNDO_UTTER_TEXT_REMOVAL" };
}

export const setUtterText = (item_position, text_position, text, current_utter) => {
  return async (dispatch) => {
    dispatch(setUtterTextAction(item_position, text_position, text, current_utter));
  }
}

export const changeUtterForm = (have_alternatives, current_utter) => {
  let old_utters = current_utter.utters;
  let new_utters = [];
  let texts = [];

  old_utters.forEach(i => {
    i.utterText.forEach(j => {
      texts.push(j.text);
    })
  })

  if (have_alternatives) {
    new_utters = texts.map(text => ({ utterText: [{ text: text }] }));
  } else {
    new_utters = [{ utterText: texts.map(text => ({ text: text })) }];
  }

  return {
    type: "CHANGE_UTTER_FORM",
    have_alternatives: have_alternatives,
    utters: new_utters
  }
}

export const setHelperText = (helper_text) => {
  return {
    type: "SET_HELPER_TEXT",
    helper_text: helper_text
  }
}