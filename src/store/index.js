import { createStore } from 'redux';
import appReducer from './reducers';

let store = createStore(appReducer, {backers: [], activeBacker: null});

export default store;