import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducer
import { userReducer } from '../store/reducers/userReducers';
import { egmCashInOutReducer, egmStatus } from '../store/reducers/egmReducer';

const reducer = combineReducers({
  user: userReducer,
  egmCashInOutData: egmCashInOutReducer,
  egmStatus,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
