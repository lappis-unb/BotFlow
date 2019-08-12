import { createReducer, createActions } from 'reduxsauce';
import axios from 'axios';

export const { Types, Creators } = createActions({
  fetchUtter: ['projectName'],
  handleEdit: ['id', 'order'],
  editText: ['text', 'id', 'order'],
  confirmEdit: ['utterObject'],
  cancelEdit: ['text'],
});


/* Initial State */

export const INITIAL_STATE = [];

const fetchUtter = action => axios.get(`/${action.payload.projectName}/utters`);

const handleEdit = (state = INITIAL_STATE, action) => state.filter((utter) => {
  if (utter._key === action.payload.id) {
    utter.filter((utterValue) => {
      if (utterValue.order === action.payload.order) {
        utterValue.utterText.edit = true;
      }
      return utterValue;
    });
  }
  return utter;
});

const editText = (state = INITIAL_STATE, action) => state.filter((utter) => {
  if (utter._key === action.payload.id) {
    utter.filter((utterValue) => {
      if (utterValue.order === action.payload.order) {
        utterValue.utterEdit = action.payload.text;
      }
      return utterValue;
    });
  }
  return utter;
});


export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_UTTER]: fetchUtter,
  [Types.HANDLE_EDIT]: handleEdit,
  [Types.EDIT_TEXT]: editText,
});
