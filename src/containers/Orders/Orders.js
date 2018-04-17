import React, { Component, Fragment } from 'react'
import Order from './Order';
import { Dimmer, Loader } from 'semantic-ui-react';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/'; 
import { connect } from 'react-redux';

export class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    return (
      <Fragment>
        <Dimmer active={this.props.loading} inverted>
          <Loader>Loading orders</Loader>
        </Dimmer>
        {
          this.props.orders.map(order => 
            <Order key={order.id} 
                   ingredients={order.ingredients} 
                   price={order.price} />
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
