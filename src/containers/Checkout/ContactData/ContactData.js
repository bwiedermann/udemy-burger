import React, { Component } from 'react'
import { Form, Card, Loader, Dimmer } from 'semantic-ui-react';
import axios from '../../../axios-orders';

export class ContactData extends Component {
  
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zip: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({loading: true})
    const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,  // should calculate on server
        customer: {
            name: 'Ben',
            address: '123 Main St.',
            zip: '11111',
            email: 'test@test.com',
        }
    }
    axios.post('/orders.json', order)
         .then(response => this.setState({loading: false}))
         .catch(error => {
             this.setState({loading: false});
             console.log('Error ' + error);
         });
  }

  render() {
    return (
      <Card>
        <Dimmer active={this.state.loading} inverted>
          <Loader>Ordering</Loader>
        </Dimmer>
        <h4>Enter contact data</h4>  
        <Form>
          <Form.Input label='Name' type='text' placeholder='Your Name' />
          <Form.Input label='Email' type='email' value='a@a.com'/>
          <Form.Input label='Street' type='text' placeholder='Street' />
          <Form.Input label='Zip' type='number' />
          <Form.Button onClick={this.orderHandler} content='Order' />
        </Form>
      </Card>
    )
  }

}

export default ContactData;
