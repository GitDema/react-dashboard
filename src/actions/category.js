import { SET_CATEGORY } from '../constants';

export function setCategory (category) {
  return {
    type: SET_CATEGORY,
    category
  };
}