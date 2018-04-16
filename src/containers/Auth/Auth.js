import React, { Component } from 'react'
import { Form, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
import $ from 'jquery';
import axios from 'axios';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class Auth extends Component {
  state = {
    form: {
      email: {
        elementConfig: {
          type: 'email',
          placeholder: 'a@a.com',
          required: true,
        },
        value: 'test@test.com'
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

  onAuth = (event, isRegister) => {
    const formID = 'AuthForm' + isRegister ? 'Register' : 'Login';
    if (!this.formIsValid(formID)) {
      return;
    }

    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let formID in this.state.form) {
      formData[formID] = this.state.form[formID].value;
    }

    if (isRegister) {
      this.props.onRegister(formData.email, formData.password);
    } else {
      this.props.onLogin(formData.email, formData.password);

    }

    // this.props.onOrderBurger(order);
    this.setState({ loading: false });
  }

  formIsValid = (id) => $('#'+id)[0].checkValidity();

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
    const panes = [
      {
        menuItem: 'Login',
        render: () => (
          <Tab.Pane loading = {this.state.loading}>
            <AuthForm isRegister={false} formItems={formItems} onAuth={this.onAuth} />
          </Tab.Pane>
        ),
      },
      {
          menuItem: 'Register', 
          render: () => (
            <Tab.Pane loading = {this.state.loading}>
              <AuthForm isRegister={true} formItems={formItems} onAuth={this.onAuth} />
            </Tab.Pane>
          ),
      }
    ]
    return <Tab panes={panes} />;
  }
}

const AuthForm = (props) => (
  <Form id={"AuthForm" + props.isRegister ? 'Register' : 'Login'}>
    {props.formItems}
    <Form.Button
      onClick={(event) => props.onAuth(event, props.isRegister)}
      type='submit'
      content={props.isRegister ? 'Register' : 'Login'} />
  </Form>
);

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  onRegister: (email, password) => dispatch(actions.auth(email, password, true)),
  onLogin: (email, password) => dispatch(actions.auth(email, password, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth, axios);
