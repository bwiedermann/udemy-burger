import React, { Component } from 'react'
import { Form, Tab, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/';
import $ from 'jquery';

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
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillUpdate(newProps) {
    if (newProps.isAuthenticated) {
      const nextPage = this.props.orderInProgress ? "/checkout" : "/";
      this.props.history.push(nextPage);
    }
  }


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

    const formProps = {
      formItems: formItems,
      onAuth: this.onAuth,
      errorMessage: this.props.error && this.props.error.message,
    }
    const panes = [
      {
        menuItem: 'Sign in',
        render: () => (
          <Tab.Pane loading = {this.props.loading}>
            <AuthForm isRegister={false} {...formProps} />
          </Tab.Pane>
        ),
      },
      {
          menuItem: 'Register', 
          render: () => (
            <Tab.Pane loading = {this.state.loading}>
              <AuthForm isRegister={true} {...formProps} />
            </Tab.Pane>
          ),
      }
    ]
    return <Tab panes={panes} />;
  }
}

const AuthForm = (props) => (
  <Form id={"AuthForm" + props.isRegister ? 'Register' : 'Sign in'} error>
    {props.formItems}
    <Form.Button
      onClick={(event) => props.onAuth(event, props.isRegister)}
      type='submit'
      content={props.isRegister ? 'Register' : 'Sign in'} />
    {props.errorMessage ? <Message error content={props.errorMessage} /> : null}
  </Form>
);

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token != null,
  orderInProgress: state.burgerBuilder.orderInProgress,
})

const mapDispatchToProps = (dispatch) => ({
  onRegister: (email, password) => dispatch(actions.auth(email, password, true)),
  onLogin: (email, password) => dispatch(actions.auth(email, password, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
