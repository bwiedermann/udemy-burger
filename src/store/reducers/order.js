import * as actionTypes from '../actions/types';

const initialState = {
  orders: [],
  loading: false,
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
    purchased: true,
  };
}

export default (state = initialState, action) => {
  switch (action.type) {

    // purchasing
    case actionTypes.PURCHASE_INIT:
      return {...state, purchased: false};
    case actionTypes.PURCHASE_BURGER_START:
      return {...state, loading: true};
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return addOrder(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {...state, loading: false};

    // orders
    case actionTypes.FETCH_ORDERS_START:
      return {...state, loading: true};
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {...state, orders: action.orders, loading: false};
    case actionTypes.FETCH_ORDERS_FAIL:
      return {...state, loading: false};
      
    default:
      return state
  }
}
