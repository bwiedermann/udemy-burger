import React, { Component, Fragment } from 'react'
import Order from './Order';
import { Dimmer, Loader } from 'semantic-ui-react';
import axios from '../../axios-orders';

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = () => {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push(
            {
              ...response.data[key],
              id: key,
            }
          );
        }
        this.setState({ orders: fetchedOrders || [], loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log('Error ' + error);
      });
  }

  render() {
    console.log(this.state.orders);
    return (
      <Fragment>
        <Dimmer active={this.state.loading} inverted>
          <Loader>Loading orders</Loader>
        </Dimmer>
        {
          this.state.orders.map(order => 
            <Order key={order.id} 
                   ingredients={order.ingredients} 
                   price={order.price} />)
        }
      </Fragment>
    );
  }
}

export default Orders;
