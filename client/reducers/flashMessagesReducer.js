import lodash from 'lodash';
import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.flashMessages, action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      {
        return [
          ...state,
          {
            id: 1,
            type: action.message.type,
            text: action.message.text,
          },
        ];
      }
    case DELETE_FLASH_MESSAGE:
      {
        const index = lodash.findIndex(state, {
          id: action.id,
        });
        if (index >= 0) {
          return [
            ...state.slice(0, index),
            ...state.slice(index + 1),
          ];
        }
        return state;
      }
    default:
      {
        return state;
      }
  }
};
