import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, withRouter, Switch } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout'
import { connect } from 'react-redux';
import * as actions from './store/actions/';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/" component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignIn: () => dispatch(actions.checkAuthState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
