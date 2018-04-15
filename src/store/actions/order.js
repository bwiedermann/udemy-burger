import axios from '../../axios-orders';
import * as actionTypes from './types';

export const purchaseBurgerSuccess = (orderID, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderID: orderID,
  orderData: orderData,
});

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (order) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios.post('/orders.json', order)
    .then(response => dispatch(purchaseBurgerSuccess(response.data.name, order)))
    .catch(error => dispatch(purchaseBurgerFail(error)));
}

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders,
});

export const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios.get('/orders.json')
      .then(response => {
          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({...response.data[key], id: key,});
          }
          dispatch(fetchOrdersSuccess(fetchedOrders));
        })
      .catch(error => {
          dispatch(fetchOrdersFail());
        });
}
