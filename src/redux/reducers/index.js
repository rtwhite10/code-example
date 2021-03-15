import { combineReducers } from 'redux';
import reducer from './dataReducer';

const rootReducer = combineReducers({
  data: reducer
})

export default rootReducer;