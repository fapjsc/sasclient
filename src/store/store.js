import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

// Middleware
import thunk from 'redux-thunk';

// Reducer
import { userReducer } from './reducers/userReducers';
import { egmCashInOutReducer, egmStatus } from './reducers/egmReducer';
import { handoverLoginReducers } from './reducers/handoverReducers';
import showLiveReducer from './reducers/showLiveReducer';

// eslint-disable-next-line
import { memberReducer } from './reducers/memberReducer';

const reducer = combineReducers({
  user: userReducer,
  egmCashInOutData: egmCashInOutReducer,
  egmStatus,
  // handoverInput: handoverInputReducers,
  handoverLogin: handoverLoginReducers,
  member: memberReducer,
  showLive: showLiveReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
