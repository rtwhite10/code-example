import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middlewares = [thunk]

export default function storeConfig() {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )

  return {store}
}  