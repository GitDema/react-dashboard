import { SET_CATEGORY } from '../constants';

export default function category(state = { category: null }, action) {
  switch (action.type) {
    case SET_CATEGORY: {
      localStorage.setItem('category', JSON.stringify(action.category));
      console.log(action)    
      return  {
        ...{},
        order: action.category,
      };
    }
    default:
      return state;
  }
}