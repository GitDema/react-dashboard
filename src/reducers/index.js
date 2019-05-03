import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import navigation from './navigation';
import posts from './posts';
import order from './order';
import category from './category';

export default combineReducers({
  auth,
  runtime,
  navigation,
  posts,
  order,
  category
});
