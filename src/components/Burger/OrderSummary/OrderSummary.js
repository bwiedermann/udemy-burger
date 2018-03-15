import React from 'react'
import { Button, Modal } from 'semantic-ui-react';

const OrderSummary = (props) => {
  const ingredientSummary =
    Object.keys(props.ingredients).map(name => 
      <li key={name}>
        <span style={{textTransform: 'capitalize'}}>{name}</span>: {props.ingredients[name]}
      </li>
    );
  return (
    <Modal 
      open={props.purchasing}
      onClose={props.purchaseCanceled}
      trigger={
        <Button disabled={!props.purchasable} onClick={props.order}>
          Order Now
        </Button>}>
      <Modal.Header>Your Order</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>A delicious burger with the following ingredients:</p>
          {ingredientSummary}
          <p><strong>Total price:</strong> ${props.price.toFixed(2)}</p>
          <p>Continue to checkout?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={props.purchaseCanceled}>Cancel</Button>
        <Button positive onClick={props.purchaseContinued}>Continue</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default OrderSummary
