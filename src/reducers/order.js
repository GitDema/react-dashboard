import { SET_ORDER } from '../constants';

export default function order(state = { order: null }, action) {
  switch (action.type) {
    case SET_ORDER: {
      localStorage.setItem('order', JSON.stringify(action.order));
      return {
        ...state,
        order: action.order,
      };
    }
    default:
      return state;
  }
}
