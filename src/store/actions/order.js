import axios from '../../axios-orders';
import * as actionTypes from './types';

export const purchaseBurgerSuccess = (orderID, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderID: orderID,
  orderData: orderData,
})

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error,
})

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
})

export const purchaseBurger = (order) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios.post('/orders.json', order)
    .then(response => dispatch(purchaseBurgerSuccess(response.data.name, order)))
    .catch(error => dispatch(purchaseBurgerFail(error)));
}
