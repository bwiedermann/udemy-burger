import React, { Component } from 'react'
import { Form, Card, Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import withRouter from 'react-router-dom/withRouter';
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler';
import $ from 'jquery';
import * as actions from '../../../store/actions/index';

export class ContactData extends Component {
  
  state = {
    orderForm: {
      name: {
        elementConfig: {
          type: 'text',
          pattern: ".+",
          placeholder: 'Your name',          
          required: true,
        },
        value: 'Fake customer'
      },
      address: {
        elementConfig: {
          type: 'text',
          pattern: ".+",
          placeholder: 'Street',          
          required: true,
        },
        value: '123 Main St.'
      },
      zip: {
        elementConfig: {
          type: 'text',
          pattern: "[0-9]{5}",
          placeholder: '',          
          required: true,
        },
        value: '11111'
      },
      email: {
        elementConfig: {
          type: 'email',
          placeholder: 'a@a.com',          
          required: true,
        },
        value: 'fake@fake.com'
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    if (!this.formIsValid()) {
      return;
    }

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

    this.props.onOrderBurger(order, this.props.token);
  }

  formIsValid = () => $('#ContactForm')[0].reportValidity();

  inputChangedHandler = (event, inputIdentifier) => {
    const newForm = {...this.state.orderForm};
    const newItem = { ...newForm[inputIdentifier]};
    newItem.value = event.target.value;
    newForm[inputIdentifier] = newItem;

    this.setState({ 
      orderForm: newForm,
    });
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
          {...formItem.elementConfig} 
          value={value} />
      );
    }
    return (
      <Card>
        <Dimmer active={this.props.loading} inverted>
          <Loader>Ordering</Loader>
        </Dimmer>
        <h4>Enter contact data</h4>  
        <Form id="ContactForm">
          { formItems }
          <Form.Button 
            onClick={this.orderHandler} 
            type='submit' 
            content='Order' />
        </Form>
      </Card>
    )
  }

}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
})

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));
