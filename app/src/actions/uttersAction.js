export const addUtterContent = (new_utter) => {
  return {
    type: "ADD_UTTER_CONTENT",
    text: { ...new_utter.alternatives[0] }
  };
}

const setcontentsAction = (item_position, text_position, text) => {
  return {
    type: "SET_UTTER_CONTENT",
    text: text,
    text_position: text_position,
    utter_position: item_position
  };
}

export const removeUtterContent = (item_position, text_position) => {
  return {
    type: "REMOVE_UTTER_CONTENT",
    text_position: text_position,
    utter_position: item_position
  };
}

export const undoTextRemotion = () => {
  return { type: "UNDO_UTTER_CONTENT_REMOVAL" };
}

export const setUtterContent = (item_position, text_position, text, current_utter) => {
  return async (dispatch) => {
    dispatch(setcontentsAction(item_position, text_position, text, current_utter));
  }
}

export const changeUtterForm = (current_utter, have_alternatives) => {
  let old_utters = current_utter.alternatives;
  let new_alternatives = [];
  let texts = [];


  old_utters.forEach(i => {
    i.contents.forEach(j => {
      texts.push(j.text);
    })
  })

  if (have_alternatives) {
    new_alternatives = texts.map(text => ({ contents: [{ text: text }] }));
  } else {
    new_alternatives = [{ contents: texts.map(text => ({ text: text })) }];
  }

  return {
    type: "CHANGE_UTTER_FORM",
    have_alternatives: have_alternatives,
    alternatives: new_alternatives
  }
}

export const setHelperText = (helper_text) => {
  return {
    type: "SET_HELPER_CONTENT",
    helper_text: helper_text
  }
}