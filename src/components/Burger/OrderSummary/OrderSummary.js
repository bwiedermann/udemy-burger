import React, { Component } from 'react'
import { Button, Modal, Loader, Dimmer } from 'semantic-ui-react';

class OrderSummary extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // update the component only if the button should be enabled or
    // if we're going to show the order summary modal
    return (nextProps.purchasing !== this.props.purchasing) ||
      (nextProps.purchasable !== this.props.purchasable) ||
      (nextProps.loading !== this.props.loading);
  }

  render() {
    const ingredientSummary =
      Object.keys(this.props.ingredients).map(name => 
        <li key={name}>
          <span style={{textTransform: 'capitalize'}}>{name}</span>: {this.props.ingredients[name]}
        </li>
      );
    return (
      <Modal 
        open={this.props.purchasing}
        onClose={this.props.purchaseCanceled}
        trigger={
          <Button disabled={!this.props.purchasable} onClick={this.props.order}>
            Order Now
          </Button>}>
        <Modal.Header>Your Order</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Dimmer active={this.props.loading} inverted>
              <Loader>Ordering</Loader>
            </Dimmer>
            <p>A delicious burger with the following ingredients:</p>
            {ingredientSummary}
            <p><strong>Total price:</strong> ${this.props.price.toFixed(2)}</p>
            <p>Continue to checkout?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.props.purchaseCanceled}>Cancel</Button>
          <Button positive onClick={this.props.purchaseContinued}>Continue</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OrderSummary
