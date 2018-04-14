import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.push('checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients = {this.props.ingredients} 
          checkoutCancelled = {this.checkoutCancelledHandler}
          checkoutContinued = {this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} 
               render={()=><ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} />}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,  
  totalPrice: state.totalPrice,
})

export default connect(mapStateToProps)(Checkout);
