import { SET_ORDER } from '../constants';

export function setOrder(order) {
  return {
    type: SET_ORDER,
    order: order
  };
}
