import { SET_ORDER } from '../constants';

export default function order(state = { order: null }, action) {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
}
