import { combineReducers } from 'redux';
import flashMessages from '../reducers/flashMessagesReducer';
import login from './loginReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  flashMessages,
  login,
  user,
});

export default rootReducer;
