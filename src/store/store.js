import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

// Middleware
import thunk from 'redux-thunk';

// Reducer
import { userReducer } from './reducers/userReducers';
import { egmCashInOutReducer, egmStatus } from './reducers/egmReducer';
// import { meterDataReducer } from './reducers/meterReducer';

const reducer = combineReducers({
  user: userReducer,
  egmCashInOutData: egmCashInOutReducer,
  egmStatus,
  // meter: meterReducers,
  // meter: meterDataReducer,
});

const middleware = [thunk];

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(...middleware)));

export default store;
