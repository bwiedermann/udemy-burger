import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  let summary = <Redirect to="/" />
  if (props.ingredients) {
    summary = (
      <Fragment>
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={() => props.history.goBack()}
          checkoutContinued={() => props.history.push('checkout/contact-data')}
        />
        <Route path={props.match.path + '/contact-data'} component={ContactData} />
      </Fragment>
    );
  }
  return summary;
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients
})

export default connect(mapStateToProps)(Checkout);
