import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middlewares = [thunk]


if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

export default function storeConfig() {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )

  return {store}
}  