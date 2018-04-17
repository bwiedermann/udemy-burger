import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout'

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/" component={BurgerBuilder} />
      </Layout>
    );
  }
}

export default App;
