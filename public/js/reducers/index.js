import { combineReducers } from 'redux';
import kcUser from './kcUser';
import kcPage from './kcPage';

/**
 * Reducerのとりまとめ
 * @module reducers/index
 * @see module:reducers/kcUser
 * @see module:reducers/kcPage
 */

const rootReducer = combineReducers({
  kcUser,
  kcPage
});

export default rootReducer;
