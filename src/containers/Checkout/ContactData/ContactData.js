import React, { Component } from 'react'
import { Form, Card } from 'semantic-ui-react';

export class ContactData extends Component {
  
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zip: '',
    },
  };

  render() {
    return (
      <Card>
        <h4>Enter contact data</h4>  
        <Form>
          <Form.Input label='Name' type='text' placeholder='Your Name' />
          <Form.Input label='Email' type='email' />
          <Form.Input label='Street' type='text' placeholder='Street' />
          <Form.Input label='Zip' type='number' />
          <Form.Button content='Order' />
        </Form>
      </Card>
    )
  }

}

export default ContactData;
