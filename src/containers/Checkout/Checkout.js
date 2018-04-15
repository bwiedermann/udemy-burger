import React, { Fragment, Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/';

class Checkout extends Component {
  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={() => this.props.history.goBack()}
            checkoutContinued={() => this.props.history.push('checkout/contact-data')}
          />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </Fragment>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
})

export default connect(mapStateToProps)(Checkout);
