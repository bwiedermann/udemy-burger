import React, { Component, Fragment } from 'react'
import Order from './Order';

export class Orders extends Component {
  render() {
    return (
      <Fragment>
        <Order />
        <Order />
      </Fragment>
    );
  }
}

export default Orders;
