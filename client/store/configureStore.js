import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      window.__REDUX_DEVTOOLS_EXTENSION__ ?
      window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );
}
