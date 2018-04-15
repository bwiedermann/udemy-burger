import * as actionTypes from '../actions/types';

const initialState = {
  orders: [],
  purchasing: false,
}

const addOrder = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderID,
  };
  return {
    ...state, 
    loading: false, 
    orders: state.orders.concat(newOrder),
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {...state, loading: true};
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return addOrder(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {...state, loading: false};
    default:
      return state
  }
}
