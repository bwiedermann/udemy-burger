import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path="/" component={BurgerBuilder} />
        <Route exact path="/checkout" component={Checkout} />
      </Layout>
    );
  }
}

export default App;
