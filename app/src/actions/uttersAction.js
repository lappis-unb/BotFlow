export const addUtterContent = (new_utter) => {
  return {
    type: "ADD_UTTER_CONTENT",
    text: { ...new_utter.alternatives[0] }
  };
}

export const removeUtterContent = (item_position, text_position) => {
  return {
    type: "REMOVE_UTTER_CONTENT",
    text_position: text_position,
    item_position: item_position
  };
}

export const undoTextRemotion = () => {
  return { type: "UNDO_UTTER_CONTENT_REMOVAL" };
}

export const setUtterContent = (item_position, text_position, text) => {
  return {
    type: "SET_UTTER_CONTENT",
    text: text,
    text_position: text_position,
    utter_position: item_position
  };
}

export const changeUtterForm = (utter_form_data, have_alternatives) => {
  let texts = [];
  let new_alternatives = [];

  utter_form_data.forEach(i => {
    (i.contents).forEach(j => {
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
    item_contents: new_alternatives,
    have_alternatives: have_alternatives
  }
}