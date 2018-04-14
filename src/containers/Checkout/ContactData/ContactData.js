import React, { Component } from 'react'
import { Form, Card, Loader, Dimmer } from 'semantic-ui-react';
import axios from '../../../axios-orders';
import withRouter from 'react-router-dom/withRouter';

export class ContactData extends Component {
  
  state = {
    orderForm: {
      name: {
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',          
          required: false,
        },
        value: ''
      },
      address: {
        elementConfig: {
          type: 'text',
          placeholder: 'Street',          
          required: false,
        },
        value: ''
      },
      zip: {
        elementConfig: {
          type: 'number',
          placeholder: '',          
          required: false,
        },
        value: ''
      },
      email: {
        elementConfig: {
          type: 'email',
          placeholder: 'a@a.com',          
          required: false,
        },
        value: ''
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({loading: true});
    const formData = {};
    for (let formID in this.state.orderForm) {
      formData[formID] = this.state.orderForm[formID].value;
    }
    const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,  // should calculate on server
        customer: formData,
    }
    axios.post('/orders.json', order)
         .then(response => {
           this.setState({loading: false});
           this.props.history.push('/');
         })
         .catch(error => {
             this.setState({loading: false});
             console.log('Error ' + error);
         });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const newForm = {...this.state.orderForm};
    const newItem = { ...newForm[inputIdentifier]};
    newItem.value = event.target.value;
    newForm[inputIdentifier] = newItem;
    // this.setState({ orderForm: newForm });
  }

  render() {
    const formItems = [];
    for(let key in this.state.orderForm) {
      const formItem = this.state.orderForm[key];
      const value = formItem.value;
      formItems.push(
        <Form.Input 
          key={key} 
          label={key}
          onChange={(event) => this.inputChangedHandler(event, key)}
          {...formItem.elementConfig} />
      );
    }
    return (
      <Card>
        <Dimmer active={this.state.loading} inverted>
          <Loader>Ordering</Loader>
        </Dimmer>
        <h4>Enter contact data</h4>  
        <Form>
          { formItems }
          <Form.Button onClick={this.orderHandler} type='submit' content='Order' />
        </Form>
      </Card>
    )
  }

}

export default withRouter(ContactData);
