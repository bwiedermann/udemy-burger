import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react';
import $ from 'jquery';

class Auth extends Component {
  state = {
    form: {
      name: {
        elementConfig: {
          type: 'text',
          pattern: ".+",
          placeholder: 'Your name',
          required: true,
        },
        value: 'Fake customer'
      },
      email: {
        elementConfig: {
          type: 'email',
          placeholder: 'a@a.com',
          required: true,
        },
        value: 'fake@fake.com'
      },
      password: {
        elementConfig: {
          type: 'password',
          pattern: '.......+',
          placeholder: 'password',
          required: true,
        },
        value: 'password'
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    if (!this.formIsValid()) {
      return;
    }

    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let formID in this.state.form) {
      formData[formID] = this.state.form[formID].value;
    }
    console.log(formData);
    // const order = {
    //   ingredients: this.props.ingredients,
    //   price: this.props.totalPrice,  // should calculate on server
    //   customer: formData,
    // }

    // this.props.onOrderBurger(order);
    this.setState({ loading: false });
  }

  formIsValid = () => $('#AuthForm')[0].checkValidity();

  inputChangedHandler = (event, inputIdentifier) => {
    const newForm = { ...this.state.form };
    const newItem = { ...newForm[inputIdentifier] };
    newItem.value = event.target.value;
    newForm[inputIdentifier] = newItem;
    this.setState({ form: newForm });
  }

  render() {
    const formItems = [];
    for (let key in this.state.form) {
      const formItem = this.state.form[key];
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
      <Segment raised compact loading = {this.state.loading}>
        {/* <Dimmer active={this.props.loading} inverted>
          <Loader>Ordering</Loader>
        </Dimmer> */}
        <h4>Please sign in</h4>
        <Form id="AuthForm">
          {formItems}
          <Form.Button
            onClick={this.orderHandler}
            type='submit'
            content='Sign in' />
        </Form>
      </Segment>
    )
  }
}

export default Auth;
